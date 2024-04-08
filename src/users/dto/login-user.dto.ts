import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
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

}