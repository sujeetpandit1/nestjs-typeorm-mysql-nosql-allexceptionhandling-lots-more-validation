import { IsOptional, IsNumber, IsString, IsDecimal } from 'class-validator';

export class UpdateProductDto {

  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  productImage?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  price?: number;
  length: number;
}
