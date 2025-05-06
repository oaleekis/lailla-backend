import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialEntity } from 'src/db/entities/financial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialEntity])],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {}
