import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoriesDto, FindAllParameters } from './dto/create-categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/db/entities/categories.entity';
import { FindOptionsWhere, Repository, Like } from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(
      @InjectRepository(CategoriesEntity)
      private readonly categoriesRepository: Repository<CategoriesEntity>
    ) {}
  

  async create(createCategoriesDto: CreateCategoriesDto, userId: string) {
    const categoriesToSave: CategoriesEntity = {
      userId: userId,
      name: createCategoriesDto.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdCategories = await this.categoriesRepository.save(categoriesToSave);

    return this.mapEntityToDto(createdCategories);
  }

  async findById(id: string, userId): Promise<CreateCategoriesDto> {
    const foundCategories = await this.categoriesRepository.findOne({where: {id}});

    if (!foundCategories) {
      throw new HttpException('Categorie not found', HttpStatus.NOT_FOUND);
    }

    if (foundCategories.userId !== userId) {
      throw new HttpException('You do not have permission to access this category', HttpStatus.FORBIDDEN);
    }

    return this.mapEntityToDto(foundCategories);
  }

  async findAll(params: FindAllParameters): Promise<{ items: CreateCategoriesDto[], totalItems: number }> {
    const searchParams: FindOptionsWhere<CategoriesEntity> = {}

    if (params.name) {
      searchParams.name = Like(`%${params.name}%`);
    }

    searchParams.userId = params.userId;

    const page = params.page || 1;
    const pageSize = params.pageSize || 5;

    const skip = (page - 1) * pageSize;
    const take = pageSize;


    const [categoriesFound, totalItems] = await this.categoriesRepository.findAndCount({
      where: searchParams,
      skip,
      take
    });
  
     const items = categoriesFound.map(categoriesEntity => this.mapEntityToDto(categoriesEntity));

     return { items, totalItems };
  }

  async update(id: string, createCategoriesDto: CreateCategoriesDto, userId: string) {
    const categoriesFound = await this.categoriesRepository.findOne({where: {id}});

    if(!categoriesFound) {
      throw new HttpException('Categories not found', HttpStatus.BAD_REQUEST);
    }

    if (categoriesFound.userId !== userId) {
      throw new HttpException('You do not have permission to update this category', HttpStatus.FORBIDDEN);
    }

    await this.categoriesRepository.update(id, this.mapDtoToEntity(createCategoriesDto));
  }

  async remove(id: string, userId: string) {
    const categoriesFound = await this.categoriesRepository.findOne({where: {id}});
    if (!categoriesFound) {
      throw new HttpException('Categories not found', HttpStatus.BAD_REQUEST);
    }

    if (categoriesFound.userId !== userId) {
      throw new HttpException('You do not have permission to delete this category', HttpStatus.FORBIDDEN);
    }

    const result = await this.categoriesRepository.softDelete(id);

    if (!result.affected) {
      throw new HttpException('Categories not found', HttpStatus.BAD_REQUEST);
    }
  }


   private mapEntityToDto(categoriesEntity: CategoriesEntity): CreateCategoriesDto {
      return {
        id: categoriesEntity.id,
        userId: categoriesEntity.userId,
        name: categoriesEntity.name,
        createdAt: categoriesEntity.createdAt,
        updatedAt: categoriesEntity.updatedAt,
        deletedAt: categoriesEntity.deletedAt
      }
    }
  
    private mapDtoToEntity(createCategoriesDto: CreateCategoriesDto): Partial<CategoriesEntity> {
      return {
        userId: createCategoriesDto.userId,
        name: createCategoriesDto.name,
        createdAt: createCategoriesDto.createdAt,
        updatedAt: createCategoriesDto.updatedAt,
        deletedAt: createCategoriesDto.deletedAt
      }
    }
}
