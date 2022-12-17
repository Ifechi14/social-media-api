import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class FollowAUserDTO {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    person_to_be_followed_id: number;
}