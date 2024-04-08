import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.register({
    secret: 'secret',
    signOptions:{expiresIn:'6h'}
  }),
  TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
