import { IsNumber } from "class-validator"

export class FollowUserDto {

    @IsNumber()
    userId: number;
}