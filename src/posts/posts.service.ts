import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Posts) private repo: Repository<Posts>){}
    // constructor(@Inject(POST_REPOSITORY) private readonly postRepository: typeof Post) { }

    async create(postDto: CreatePostDto, user: User){
        const posts = this.repo.create(postDto);
        posts.user = user;
        return this.repo.save(posts)
    }

    async findOne(id: number){
        if(!id){
            return null
        }

        return await this.repo.findOne({ where: { id }})
    }

    async delete(id: number){
        const posts = await this.repo.findOne({ where: { id }})
        if(!posts){
            throw new NotFoundException('Post not found')
        }

        return this.repo.remove(posts);

    }

    async like(id: number){}
    
}
