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

  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
