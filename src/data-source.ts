import "reflect-metadata";
import { DataSource } from "typeorm";

import { Post } from "./entity/Post";
import { User } from "./entity/User";
import { Comment } from "./entity/Comment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "imranovazer",
  password: "20023838Aze",
  database: "postgres",
  entities: [Post, User, Comment],
  synchronize: true,
  logging: false,
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
// AppDataSource.initialize()
//     .then(() => {
//         // here you can start to work with your database
//     })
//     .catch((error) => console.log(error))
