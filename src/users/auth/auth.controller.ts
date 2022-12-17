import { Controller, Post, Get, Session, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { LoginUserDto } from "../dtos/loginUser.dto";
import { CurrentUser } from "../decorators/custom-user.decorator";
import { User } from "../users.entity";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { UserDto } from "../dtos/user.dto";

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
    constructor(private authService: AuthService){}
      
  //Registration Route
  @Post('/register')
  async createUser(@Body() body: CreateUserDto, @Session() session: any){
    const user = await this.authService.register(
     body);
    session.userId = user.id;
    return user;
  }

  //Login Route
  @Post('/login')
  async login(@Body() body: LoginUserDto, @Session() session: any){
    const user = await this.authService.login(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  //Get Current Signed in User
  @UseGuards(AuthGuard)
  @Get('/currentuser')
  whoAmI(@CurrentUser() user: User){
    return user;
  }

  //SignOut Route
  @Post('/signout')
  signOut(@Session() session: any){
    session.userId = null;
  }
}