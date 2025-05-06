import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsDateString, IsUUID } from 'class-validator';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  id: string;

  @Column({ type: 'varchar', length: 256 })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  @IsEmail()
  @MinLength(5)
  @MaxLength(256)
  email: string;

  @Column({ type: 'varchar', length: 256 })
  @IsString()
  @MinLength(6)
  password: string;

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
