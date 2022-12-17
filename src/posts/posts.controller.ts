import { Body, Controller, Param, Post, Get, Delete, Patch,UseGuards, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PostsDto } from './dtos/posts.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/custom-user.decorator';

import { User } from 'src/users/users.entity';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  
  @Post('/newpost')
  @Serialize(PostsDto)
  createPost(@Body() body: CreatePostDto, @CurrentUser() user: User){
    return this.postsService.create(body, user);
  }

  //Find a Post
  @Get('/:id')
  @Serialize(PostsDto)
  async findPost(@Param('id') id: string){
    const post = await this.postsService.findOne(parseInt(id))

    if(!post){
      throw new NotFoundException('Post not found')
    }

    return post;
  }

  @Patch('/:id/like')
  likePost(@Param('id') id: string){}

  @Delete('/:userId')
  deletePost(@Param('userId') userId: string){
    return this.postsService.delete(parseInt(userId))
  }  
}
