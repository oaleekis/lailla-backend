import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { CreateFinancialDto, FindAllParameters, FinancialRouteParameters } from './dto/create-financial.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FinancialService } from './financial.service';

@UseGuards(AuthGuard)
@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) { }

  @Get('/total')
  async getTotalBalanceLastMonth(@Request() req): Promise<number> {
    const userId = req.user.sub;
    return this.financialService.getTotalBalanceLastMonth(userId);
  }

  @Get('/incomes')
  async getTotalIncomesLastMonth(@Request() req): Promise<number> {
    const userId = req.user.sub;
    return this.financialService.getTotalIncomesLastMonth(userId);
  }

  @Get('/expenses')
  async getTotalExpensesLastMonth(@Request() req): Promise<number> {
    const userId = req.user.sub;
    return this.financialService.getTotalExpensesLastMonth(userId);
  }

  @Post()
  async create(@Request() req, @Body() createFinancialDto: CreateFinancialDto): Promise<CreateFinancialDto> {
    const userId = req.user?.sub;
    return await this.financialService.create(createFinancialDto, userId);
  }

  @Get()
  async findAll(@Request() req, @Query() params: FindAllParameters): Promise<{ items: CreateFinancialDto[], totalItems: number }> {
    const userId = req.user.sub;
    return this.financialService.findAll({ ...params, userId });
  }

  @Get('/:id')
  async findById(@Request() req, @Param('id') id: string): Promise<CreateFinancialDto> {
    const userId = req.user.sub;
    return this.financialService.findById(id, userId);
  }

  @Put('/:id')
  async update(@Request() req, @Param() params: FinancialRouteParameters, @Body() createFinancialtDto: CreateFinancialDto) {
    const userId = req.user.sub;
    await this.financialService.update(params.id, createFinancialtDto, userId);
  }

  @Delete('/:id')
  remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.financialService.remove(id, userId);
  }
}
