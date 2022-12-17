import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    AfterInsert, 
    AfterRemove, 
    AfterUpdate,
    OneToMany,
    ManyToMany
} from "typeorm";
import { Posts } from "src/posts/posts.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    bio: string;
    
    @Column()
    location: string;

    @Column()
    profilepicture: string;

    // @Column("int", { array: true })
    // followers: string[];

    // @Column('text', { array: true })
    // public paragraphs: string[];

    @Column({nullable: true, array: true})
    followers: string[];

    @Column({nullable: true, array: true})
    followings: string[];

    @OneToMany(() => Posts, (posts) => posts.user)
    posts: Posts[];

    @AfterInsert()
    logInsert(){
        console.log('inserted with id', this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('Removed User with id', this.id);
    }
}