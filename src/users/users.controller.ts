import { 
  Controller,
  Body, 
  Get, 
  Patch, 
  Delete, 
  Query, 
  Param, 
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthService } from './auth/auth.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { FollowAUserDTO } from './dtos/request.dto';
import { CurrentUser } from './decorators/custom-user.decorator';
import { User } from './users.entity';


@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService  ){}

  //Find a User
  @Get('/:id')
  async findUser(@Param('id') id: string){
    const user = await this.usersService.findOne(parseInt(id));

    if(!user){
      throw new NotFoundException('User not found')
    }

    return user;
  }

  //Find User
  @Get()
  async findAUser(@Query('username') username : string){
    return await this.usersService.getUsers()
  }

  //Update User
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    return await this.usersService.update(parseInt(id), body)
  }

  //Delete User
  @Delete('/:id')
  async delete(@Param('id') id: string){
    return await this.usersService.delete(parseInt(id));
  }

  //follow a user
  // @Patch('follow')
  // async followAUser(@Body() body: FollowAUserDTO, @CurrentUser() user: User){
  //     return await this.usersService.followAUser(body, user);
  // }

  //unfollow a user
  // @Patch('/:id/unfollow')
  // unfollow(@Param('id') id: string, @Req() req, @Res() res, @Body() body: RequestDtO){
  //   return this.usersService.unfollow(parseInt(id), body, req, res)
  // }

}
