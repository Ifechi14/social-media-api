import { 
    IsEmail, 
    IsOptional, 
    IsString, 
    IsArray 
} from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    location: string;

    @IsString()
    @IsOptional()
    profilepicture: string;

    @IsArray()
    @IsOptional()
    followers: string[];

    @IsArray()
    @IsOptional()
    followings: string[]
}