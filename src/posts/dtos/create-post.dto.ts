import { IsString, IsOptional, IsArray} from "class-validator";

export class CreatePostDto {

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsArray()
    @IsOptional()
    likes: number[];

}