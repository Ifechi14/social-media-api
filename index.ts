import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Posts } from 'src/posts/posts.entity';

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "test",
    entities: [User, Posts],
    synchronize: true
})

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))