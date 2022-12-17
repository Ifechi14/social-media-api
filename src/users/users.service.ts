import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { FollowAUserDTO } from './dtos/request.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}



    //Create User
    create(
        createUserDTO: CreateUserDto
    ){
        const user = this.repo.create(createUserDTO);

        return this.repo.save(user);
    }

    //get a user
    async findOne(id: number) {
        return await this.repo.findOne({ where: { id } });
    }

    //get all users(admin)
    async getUsers(){
        const users = await this.repo.find()

        return  users 
    }

    //get a user with username
    async find(username: string){
        return await this.repo.findOne({ where: { username }})
    }

    //get a user with email
    async findEmail(email: string){
        return await this.repo.findOne({ where: { email }})
    }


    //update user
    async update(id: number, attrs: Partial<User>){
        const user = await this.repo.findOne({ where: { id }})
        if(!user){
            throw new NotFoundException('User not found')
        }

        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    //delete user
    async delete(id: number){
        const user = await this.repo.findOne({ where: { id }})
        if(!user){
            throw new NotFoundException('User not found')
        }

        return this.repo.remove(user)
    }

    
    // async followAUser(params: FollowAUserDTO, user: User) {
    //     try {
    //         const user_trying_to_follow = user;
    //         const user_to_be_followed = await this.repo.findOne({where: {
    //             id: params.person_to_be_followed_id
    //         }});
    //         user_trying_to_follow.followings.push(user_to_be_followed.id);
    //         user_to_be_followed.followers.push(user_trying_to_follow.id);

    //         return await this.repo.insert(user_trying_to_follow);
    //     } catch(error) {
    //         console.error('follow() error \n %o', error);

    //         return new Error(`${error.message || "followAUser() error"}`);
    //     }
    // }

    
    }

    // exports.follow = async(req,res,next)=>{
    //     //     if(req.body.userId !== req.params.id){
    //     //         try {
    //     //             const user= await User.findById(req.params.id);
    //     //             const currentUser= await User.findById(req.body.userId);
    //     //             if(!user.followers.includes(req.body.userId)){
    //     //                 await user.updateOne({ $push: { followers: req.body.userId } });
    //     //                 await currentUser.updateOne({ $push: { followings: req.body.userId } });
    //     //                 res.status(200).json({
    //     //                     status: 'success',
    //     //                     message: 'User has been followed'
    //     //                 })
    //     //             }else{
    //     //                 res.status(403).json("user is already followed")
    //     //             }
    //     //         } catch (err) {
    //     //              return next(new AppError('No user found', 404));
    //     //         }
        
    //     //     }else{
    //     //         res.status(403).json({
    //     //             status: 'fail',
    //     //             message:'You cant follow yourself'
    //     //         })
    //     //     }
    //     }

    //unfollow a user
    // async unfollow(id: number, body: RequestDtO, req: Request, res: Response){
    //     const info = req.body.username;

    //     if(info){
    //       try {
    //           const user = await this.findOne(id);
    //           const currentUser = await this.find(info);
    //           if(!user.followings.includes(info)){
    //                user.followers = []
    //                currentUser.followings = []
    //               await user.followings.push(req.body.username)
    //               await currentUser.followers.push(id)
    //               res.status(200).json({
    //                   status: 'success',
    //                   message: 'User has been followed'
    //               })
    //           }else{
    //               res.status(403).json("user is already followed")
    //           }
  
    //       } catch (error) {
              
    //       }
    // }
      

