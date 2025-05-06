import { IsString, IsUUID, IsOptional, IsDateString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { PaymentTypeEnum } from 'src/utils/enum/PaymentTypeEnum';

export interface FindAllParameters {
  title?: string;
  userId: string;
  categoryId?: string;
  type?: PaymentTypeEnum;
  date?: string;
  page?: number;
  pageSize?: number;
}

export class FinancialRouteParameters {
  @IsUUID()
  id: string;
}

export class CreateFinancialDto {

  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsUUID()
  categoryId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  value: string;

  @IsEnum(PaymentTypeEnum, { message: 'paymentType must be receita or despesa' })
  type: PaymentTypeEnum;

  @IsDateString()
  @IsOptional()
  date: string;

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
