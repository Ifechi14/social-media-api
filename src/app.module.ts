import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.entity';
import { Posts } from './posts/posts.entity';
import { UsersController } from './users/users.controller';
import { AuthService } from './users/auth/auth.service';
import { UsersService } from './users/users.service';
import { AuthModule } from './users/auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config({
  path: './env'
})


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return { 
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [User, Posts],
          synchronize: true
        }
      }
    }),
  PostsModule, 
  AuthModule,
  TypeOrmModule.forFeature([User]), 
  UsersModule
],
  controllers: [UsersController],
  providers: [AuthService, UsersService],
})
export class AppModule {}


// ///

