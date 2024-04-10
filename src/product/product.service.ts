import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    // private  jwtService: JwtService,
  ) {}


  async create(user: any, createProductDto: CreateProductDto) {

    if(user.role !== process.env.ADMIN){
      throw new HttpException('You are not authorized to create a product', HttpStatus.UNAUTHORIZED);
    }
    
    const product = this.productRepository.create({
      userId: user.id,
      productName: createProductDto.productName,
      category: createProductDto.category,
      brand: createProductDto.brand,
      quantity: createProductDto.quantity,
      productImage: createProductDto.productImage,
      description: createProductDto.description,
      price: createProductDto.price
    });
    await this.productRepository.save(product);
    return product;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
