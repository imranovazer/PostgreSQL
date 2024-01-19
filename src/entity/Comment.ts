import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, ManyToMany, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string



    @OneToOne(() => User)
    @JoinColumn()
    user: User


    @ManyToOne(() => Post, (post) => post.comments)
    post: Post



    

    @ManyToMany(() => User, (user) => user.favoritePosts 
    
    // ,{cascade:true}
    )
    likes: User[]

    
    @ManyToOne(()=>User , (author)=>author.posts)
    author : User
}   