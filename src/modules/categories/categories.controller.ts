import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { CreateCategoriesDto, FindAllParameters, CategoriesRouteParameters } from './dto/create-categories.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoriesService } from './categories.service';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Request() req,@Body() createCategoriesDto: CreateCategoriesDto): Promise<CreateCategoriesDto> {    
    const userId = req.user?.sub;
    return await this.categoriesService.create(createCategoriesDto, userId);
  }

  @Get()
  async findAll(@Request() req, @Query() params: FindAllParameters): Promise<{ items: CreateCategoriesDto[], totalItems: number }> {
    const userId = req.user.sub;
    return this.categoriesService.findAll({ ...params, userId });
  }

  @Get('/:id')
  async findById(@Request() req, @Param('id') id: string): Promise<CreateCategoriesDto> {
    const userId = req.user.sub;
    return this.categoriesService.findById(id, userId);
  }

  @Put('/:id')
  async update(@Request() req, @Param() params: CategoriesRouteParameters, @Body() createCategoriesDto: CreateCategoriesDto) {
    const userId = req.user.sub;
    await this.categoriesService.update(params.id, createCategoriesDto, userId);
  }

  @Delete('/:id')
  remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.categoriesService.remove(id, userId);
  }
}
