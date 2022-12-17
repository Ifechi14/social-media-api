import { Expose, Transform } from "class-transformer";

export class PostsDto {

    @Expose()
    id: number;

    @Expose()
    description: string;

    @Expose()
    image: string;

    @Expose()
    likes: number[];

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;

}