import { Controller, Get, Post, Body, HttpException, HttpStatus, UseGuards, Req, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

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
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const data = await this.userService.findAll();
    if(!data) throw new HttpException("No Data Found!",HttpStatus.NOT_FOUND)
    else   
    return {
      message: "Data Retrieved Successfully",
      data: data
    };
  }

  @Get('/single')
  @UseGuards(JwtAuthGuard)
  async userProfile(@Req() req: any): Promise<any> {
    let id=req.user.id;
    const data = await this.userService.getUserById(id);
    return {message:"User Profile Retrived Successfully", data : data};
  }

  @Patch('profile') // Endpoint to get user profile
  @UseGuards(JwtAuthGuard) // Protect this endpoint with JWT authentication
  async updateData(@Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    const userId = req.user.id; // Extract user ID from request
    // console.log(userId);
    
    const data = await this.userService.updateProfile(userId, updateUserDto);
    return {
      message: "User Updated Successfully",
      data: "",
      // data: data
    }
  } 

  //now delete the profile
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async removeProfile(@Req() req: any) {
        const id = req.user.id;
        await this.userService.removeProfile(id);
        return {
          statusCode:200,
          message: 'Account Deleted Succesfully'
        }

  }
}
