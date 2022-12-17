import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../dtos/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async register(
        createUserDTO: CreateUserDto
    ){
        ///checking if email is already in use
        const checkedUser= await this.usersService.findEmail(createUserDTO.email);
        if(checkedUser){
            throw new BadRequestException('Email already in use');
        }

        const password = checkedUser.password;

        ///encrypting the users password
        //generate a salt
        const salt = randomBytes(8).toString('hex');

        ///hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        
        ///create a new user and save it
        const user = await this.usersService.create(
            createUserDTO
        );

        //return user
        return user;
        
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findEmail(email);
        if(!user) {
            throw new NotFoundException('User not found')
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(storedHash!== hash.toString('hex')) {
            throw new BadRequestException('Invalid Password');
        }

        return user;   
    }
}
