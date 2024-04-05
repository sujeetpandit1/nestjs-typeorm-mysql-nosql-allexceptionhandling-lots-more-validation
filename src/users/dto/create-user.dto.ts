// user.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email must be a valid email' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, {
        message: 'Password must contain at least one letter, one number, and one special character'
    })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(16, { message: 'Password must be at most 16 characters long' })
    password: string;

    @IsNotEmpty({ message: 'Role is required' })
    @IsString({ message: 'Role must be a string' })
    @IsEnum(['admin', 'user', 'other'], { message: 'Role must be either admin, user, or other' })
    role: string;

    @IsNotEmpty({ message: 'Date of Birth is required' })
    dob: Date;

    @IsNotEmpty({ message: 'Address is required' })
    @IsString({ message: 'Address must be a string' })
    address: string;

    @IsNotEmpty({ message: 'Pincode is required' })
    @IsNumber({}, { message: 'Pincode must be a number' })
    pincode: number;

    @IsNotEmpty({ message: 'Mobile number is required' })
    @IsString({ message: 'Mobile number must be a string' })
    @Matches(/^\d{10}$/, { message: 'Mobile number must be exactly 10 digits' })
    mobile_no: string;
}


export enum UserType {
    USER = 'user',
    ADMIN = 'admin',
    OTHER = 'other',
  }