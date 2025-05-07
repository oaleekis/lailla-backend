import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFinancialDto, FindAllParameters } from './dto/create-financial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialEntity } from 'src/db/entities/financial.entity';
import { FindOptionsWhere, Repository, Like, Between } from 'typeorm';
import { PaymentTypeEnum } from 'src/utils/enum/PaymentTypeEnum';

@Injectable()
export class FinancialService {

  constructor(
    @InjectRepository(FinancialEntity)
    private readonly financialRepository: Repository<FinancialEntity>
  ) { }


  async create(createFinancialDto: CreateFinancialDto, userId: string) {
    const financialToSave: FinancialEntity = {
      userId: userId,
      categoryId: createFinancialDto.categoryId,
      title: createFinancialDto.title,
      value: createFinancialDto.value,
      date: createFinancialDto.date,
      type: createFinancialDto.type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdFinancial = await this.financialRepository.save(financialToSave);

    return this.mapEntityToDto(createdFinancial);
  }

  async findById(id: string, userId): Promise<CreateFinancialDto> {
    const foundFinancial = await this.financialRepository.findOne({ where: { id, userId } });

    if (!foundFinancial) {
      throw new HttpException('Financial not found', HttpStatus.NOT_FOUND);
    }
    

    return this.mapEntityToDto(foundFinancial);
  }

  async findAll(params: FindAllParameters): Promise<{ items: CreateFinancialDto[], totalItems: number }> {
    const searchParams: FindOptionsWhere<FinancialEntity> = {}

    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }

    if(params.date) {
      searchParams.date = Like(`%${params.date}%`);
    }

    searchParams.userId = params.userId;

    const page = params.page || 1;
    const pageSize = params.pageSize || 5;

    const skip = (page - 1) * pageSize;
    const take = pageSize;


    const [financialFound, totalItems] = await this.financialRepository.findAndCount({
      where: searchParams,
      skip,
      take
    });

    const items = financialFound.map(financialEntity => this.mapEntityToDto(financialEntity));

    return { items, totalItems };
  }

  async update(id: string, createFinancialDto: CreateFinancialDto, userId: string) {
    const financialFound = await this.financialRepository.findOne({ where: { id } });

    if (!financialFound) {
      throw new HttpException('Financial not found', HttpStatus.BAD_REQUEST);
    }

    if (financialFound.userId !== userId) {
      throw new HttpException('You do not have permission to update this financial record', HttpStatus.FORBIDDEN);
    }

    await this.financialRepository.update(id, this.mapDtoToEntity(createFinancialDto));
  }

  async remove(id: string, userId: string) {
    const financialFound = await this.financialRepository.findOne({ where: { id } });

    if (!financialFound) {
      throw new HttpException('Financial not found', HttpStatus.BAD_REQUEST);
    }
    if (financialFound.userId !== userId) {
      throw new HttpException('You do not have permission to delete this financial record', HttpStatus.FORBIDDEN);
    }

    const result = await this.financialRepository.softDelete(id);

    if (!result.affected) {
      throw new HttpException('Financial not found', HttpStatus.BAD_REQUEST);
    }
  }

  async getTotalBalanceLastMonth(userId: string): Promise<number> {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const financials = await this.financialRepository.find({
      where: {
        userId,
        date: Between(lastMonth.toISOString(), today.toISOString()),
      }
    });

    const total = financials.reduce((acc, financial) => {
      if (financial.type === PaymentTypeEnum.RECEITA) {
        return acc + Number(financial.value);
      } else {
        return acc - Number(financial.value);
      }
    }, 0);

    return total;
  }

  async getTotalRevenuesLastMonth(userId: string): Promise<number> {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const revenues = await this.financialRepository.find({
      where: {
        userId,
        type: PaymentTypeEnum.RECEITA,
        date: Between(lastMonth.toISOString(), today.toISOString()),
      }
    });

    const totalRevenues = revenues.reduce((acc, receita) => acc + Number(receita.value), 0);

    return totalRevenues;
  }

  async getTotalExpensesLastMonth(userId: string): Promise<number> {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const expenses = await this.financialRepository.find({
      where: {
        userId,
        type: PaymentTypeEnum.DESPESA,
        date: Between(lastMonth.toISOString(), today.toISOString()),
      }
    });

    const totalExpenses = expenses.reduce((acc, despesa) => acc + Number(despesa.value), 0);

    return totalExpenses;
  }

  private mapEntityToDto(financialEntity: FinancialEntity): CreateFinancialDto {
    return {
      id: financialEntity.id,
      userId: financialEntity.userId,
      categoryId: financialEntity.categoryId,
      title: financialEntity.title,
      value: financialEntity.value,
      date: financialEntity.date,
      type: financialEntity.type as PaymentTypeEnum,
      createdAt: financialEntity.createdAt,
      updatedAt: financialEntity.updatedAt,
      deletedAt: financialEntity.deletedAt
    }
  }

  private mapDtoToEntity(createFinancialDto: CreateFinancialDto): Partial<FinancialEntity> {
    return {
      userId: createFinancialDto.userId,
      categoryId: createFinancialDto.categoryId,
      title: createFinancialDto.title,
      date: createFinancialDto.date,
      value: createFinancialDto.value,
      type: createFinancialDto.type as PaymentTypeEnum,
      createdAt: createFinancialDto.createdAt,
      updatedAt: createFinancialDto.updatedAt,
      deletedAt: createFinancialDto.deletedAt
    }
  }
}
