import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.register({
    secret: 'secret',
    signOptions:{expiresIn:'1m'}
  }),
  TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [JwtStrategy,UsersService],
  exports:[JwtModule]
})
export class UsersModule {}
