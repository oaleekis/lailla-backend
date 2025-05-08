import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, IsUUID, IsDateString, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { PaymentTypeEnum } from '../../utils/enum/PaymentTypeEnum';
import { CategoriesEntity } from './categories.entity';


@Entity('financials')
export class FinancialEntity {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  id?: string;
  
  @Column({ type: 'uuid' })
  @IsString()
  userId: string;

  @Column({ type: 'uuid'})
  @IsString()
  categoryId: string;

  @ManyToOne(() => CategoriesEntity)
  @JoinColumn({ name: 'categoryId' })
  category?: CategoriesEntity


  @Column({ type: 'varchar', length: 256 })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  amount: string;

  @Column({ type: 'enum', enum: PaymentTypeEnum })
  @IsEnum(PaymentTypeEnum)
  type: PaymentTypeEnum;

  @Column({ type: 'timestamp' })
  @IsDateString()
  date: string;

  @CreateDateColumn({ type: 'timestamp' }) 
  @IsDateString()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' }) 
  @IsDateString()
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @IsDateString()
  @IsOptional()
  deletedAt?: string;
}
