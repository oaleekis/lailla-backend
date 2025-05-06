import { IsString, IsEmail, IsPhoneNumber, IsDateString, IsOptional, IsUUID, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    name: string;

    @IsEmail()
    @MinLength(3)
    @MaxLength(256)
    email: string;

    @MinLength(3)
    @MaxLength(256)
    password: string;

    @IsDateString()
    @IsOptional()
    createdAt: string;

    @IsDateString()
    @IsOptional()
    updatedAt: string;

    @IsDateString()
    @IsOptional()
    deletedAt?: string;
}
