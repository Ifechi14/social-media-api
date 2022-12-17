import { 
    Entity, 
    Column, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { User } from "src/users/users.entity";

@Entity()
export class Posts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column("int", {nullable: true, array: true })
    likes: number[];

    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}