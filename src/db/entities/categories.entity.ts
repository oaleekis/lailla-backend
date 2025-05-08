import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsString, IsUUID, IsDateString, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';

@Entity('categories')
export class CategoriesEntity {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  id?: string;
  
  @Column({ type: 'uuid', nullable: true })
  @IsString()
  @IsOptional()
  userId?: string | null;

  @Column({ type: 'varchar', length: 256 })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

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
