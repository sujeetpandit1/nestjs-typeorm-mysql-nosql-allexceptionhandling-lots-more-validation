import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from './database/typeormpg.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigValidation } from './database/config.validation';
import { ProductModule } from './product/product.module';



@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: ConfigValidation
  }) , 
    TypeOrmModule.forRoot(dataSourceOptions),UsersModule, ProductModule],
  providers: [], 
 
})
export class AppModule {}
