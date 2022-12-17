import { Module } from "@nestjs/common";
import { UsersService } from "../users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "../users.entity";

@Module({
    imports:[TypeOrmModule.forFeature([User]),],
    providers: [AuthService, UsersService],
    controllers: [AuthController]

})

export class AuthModule {

}