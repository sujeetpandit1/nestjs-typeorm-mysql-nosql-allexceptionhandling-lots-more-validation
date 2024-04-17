import { IsNotEmpty, IsNumber, IsString, IsDecimal, IsOptional } from 'class-validator';


export class CreateProductDto {
  // @IsNotEmpty()
  // @IsNumber()
  // userId: number;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  productImage: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  price: number;

}

