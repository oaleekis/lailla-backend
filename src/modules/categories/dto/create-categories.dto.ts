import { IsString, IsUUID, IsOptional, IsDateString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { PaymentTypeEnum } from 'src/utils/enum/PaymentTypeEnum';

export interface FindAllParameters {
  name?: string;
  userId: string;
  page?: number;
  pageSize?: number;
}

export class CategoriesRouteParameters {
  @IsUUID()
  id: string;
}

export class CreateCategoriesDto {

  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;

  @IsDateString()
  @IsOptional()
  deletedAt?: string;
}
