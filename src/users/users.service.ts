import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
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
  
    // Check if email or mobile number already exists or comment if using try and catch
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { mobile_no }]
    });

    if (existingUser) { //this validation can be used for both postegres and mysql db, to avoid additional call, choose try and catch
      if (existingUser.email === email) {
        throw new HttpException(`Email (${existingUser.email}) Already Exists`, HttpStatus.CONFLICT);
      } else {
        throw new HttpException(`Mobile Number (${existingUser.mobile_no}) Already Exists`, HttpStatus.CONFLICT);
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

      // try {
        const savedUser = await this.userRepository.save(newUser); // Save user to database
        
        const { password: omitPassword, ...userData } = savedUser;
        return userData; // Return saved user data

      // } catch (error) {
      //   console.log(error);
      //   if(error.code === '23505') { for postegres and mysql code isn different
      //     throw new ConflictException(error.detail);
      //   } else {
      //     throw new InternalServerErrorException();
      //   }
      // }
  
  

  }
  

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
