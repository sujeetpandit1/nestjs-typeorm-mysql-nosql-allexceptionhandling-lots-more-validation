import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('addProduct')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProductDto: CreateProductDto, @Req() req: any){
    const user = req.user; // Extract user ID from request    
    return this.productService.create(user, createProductDto);
  }

  @Get('allProducts')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    return await this.productService.findOne(+id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {    
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return this.productService.remove(+id);
  }
}
