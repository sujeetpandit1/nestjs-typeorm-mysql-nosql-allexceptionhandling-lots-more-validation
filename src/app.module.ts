import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from './database/typeormpg.config';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),UsersModule],
  providers: [],
 
})
export class AppModule {}
