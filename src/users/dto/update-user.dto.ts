import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Email is required' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email must be a valid email' })
    email?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Role is required' })
    @IsString({ message: 'Role must be a string' })
    @IsEnum(['admin', 'user', 'other'], { message: 'Role must be either admin, user, or other' })
    role?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Date of Birth is required' })
    dob?: Date;

    @IsOptional()
    @IsNotEmpty({ message: 'Address is required' })
    @IsString({ message: 'Address must be a string' })
    address?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Pincode is required' })
    @IsNumber({}, { message: 'Pincode must be a number' })
    pincode?: number;

    @IsOptional()
    @IsNotEmpty({ message: 'Mobile number is required' })
    @IsString({ message: 'Mobile number must be a string' })
    @Matches(/^\d{10}$/, { message: 'Mobile number must be exactly 10 digits' })
    mobile_no?: string;
}


export enum UserType {
    USER = 'user',
    ADMIN = 'admin',
    OTHER = 'other',
  }
