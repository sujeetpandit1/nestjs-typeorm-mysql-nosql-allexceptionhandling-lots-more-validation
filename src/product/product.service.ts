import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll():Promise<any> {
    const data = await this.productRepository.find();
    return data;
  }

  async findOne(id: number) {
    const data = await this.productRepository.findOne({ where: { id: id }});
    if(!data){
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return data;

  }

  // async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
  //   const product = await this.productRepository.findOne({where:{id:id}});

  //   if (!product) {
  //     throw new NotFoundException(`Product with ID ${id} not found.`);
  //   }

  //   // Check if 'quantity' field exists in the DTO
  //   if ('quantity' in updateProductDto) {
  //     // If the quantity field exists, add the existing quantity with the new quantity
  //     product.quantity += updateProductDto.quantity;
  //   }

  //   // Update other fields provided in the DTO
  //   Object.keys(updateProductDto)
  //     .filter(key => key !== 'quantity') // Exclude 'quantity' field from other updates
  //     .forEach(key => {
  //       product[key] = updateProductDto[key];
  //     });


  //   return this.productRepository.save(product);
  // }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<string | Product> {

    // Check if updateProductDto is empty or undefined
    if (!updateProductDto || Object.keys(updateProductDto).length === 0) {
      //return with message
      return "Product Updated Successfully"  
    }
    const product = await this.productRepository.findOne({ where: { id: id } });

    if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    // Update the 'quantity' field if it exists in the DTO
    if ('quantity' in updateProductDto) {
        product.quantity += updateProductDto.quantity;
    }

    // Update other fields provided in the DTO
    for (const [key, value] of Object.entries(updateProductDto)) {
        // Skip 'quantity' field as it's already handled above
        if (key !== 'quantity') {
            product[key] = value;
        }
    }

    return this.productRepository.save(product);
}




  async remove(id: number) {
    const removeProduct = await this.productRepository.delete({id});
    if(!removeProduct.affected){
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    // return removeProduct;

  }
}
