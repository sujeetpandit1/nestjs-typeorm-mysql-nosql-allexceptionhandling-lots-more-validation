import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Partial<CreateUserDto>> {
    const { name, email, password, role, dob, address, pincode, mobile_no } = createUserDto;
  
    // Check if email or mobile number already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { mobile_no }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new HttpException('Email Already Exists', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Mobile Number Already Exists', HttpStatus.BAD_REQUEST);
      }
    }
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        name: name,
        email: email,
        password: hashedPass,
        role: role,
        dob: new Date(dob),
        address: address,
        pincode: pincode,
        mobile_no: mobile_no
      });
  
      const savedUser = await this.userRepository.save(newUser); // Save user to database
  
      const { password: omitPassword, ...userData } = savedUser;

      return userData; // Return saved user data
  }
  

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
