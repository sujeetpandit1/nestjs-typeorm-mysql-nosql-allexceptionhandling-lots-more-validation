import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    
      const data = await this.userService.createUser(createUserDto);
      return {message: "User Registered Successfully" , data: data || ''}
    
  } 

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
