import { Expose } from 'class-transformer';

export class UserDto {

    @Expose()
    id: number;

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    bio: string;

    @Expose()
    location: string;

    @Expose()
    profilepicture: string;

    @Expose()
    followers: string[];

    @Expose()
    followings: string[];
}