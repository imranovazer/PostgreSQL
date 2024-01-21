import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  ManyToMany,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;



  @Column()
  photo: string;

  @ManyToMany(
    () => User , user=>user.favoritePosts
  )
  likes: User[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;


  @OneToMany(() => Comment, (comment) => comment.post ,{cascade:true}) // note: we will create author property in the Photo class below
  comments: Comment[]


  @ManyToOne(() => User, (author) => author.posts)
  @JoinColumn()
  author: User;
}
