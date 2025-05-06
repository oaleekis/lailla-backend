import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }


  async create(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.findOneByEmail(createUserDto.email);

    if (userAlreadyExists) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }

    const dbUser = this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: bcryptHashSync(createUserDto.password, 10),
    });

    const createdUser = await this.userRepository.save(dbUser);

    return this.mapEntityToDto(createdUser);

  }

  async findOneByEmail(email: string): Promise<CreateUserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { email }
    })

    if (!userFound) {
      return null;
    }

    return {

      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      password: userFound.password,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      deletedAt: userFound.deletedAt
    }
  }

    private mapEntityToDto(userEntity: UserEntity): CreateUserDto {
      return {
        id: userEntity.id,
        name: userEntity.name,
        email: userEntity.email,
        password: userEntity.password,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
        deletedAt: userEntity.deletedAt
      }
    }

}
