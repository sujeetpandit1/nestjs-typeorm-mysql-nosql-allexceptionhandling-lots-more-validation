import { Controller, Get, Post, Body, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    
      const data = await this.userService.createUser(createUserDto);
      return {message: "User Registered Successfully" , data: data || ''}
    
  } 

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto){
    const data = await this.userService.login(loginUserDto);
    return {message: "Login Success", data: data}
  }

  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    if(!data) throw new HttpException("No Data Found!",HttpStatus.NOT_FOUND)
    else   
    return {
      message: "Data Retrieved Successfully",
      data: data
    };
  }
}
