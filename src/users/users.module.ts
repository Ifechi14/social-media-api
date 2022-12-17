import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor
  }]
})

export class UsersModule {}
