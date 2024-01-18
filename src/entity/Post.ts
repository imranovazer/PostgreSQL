import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm"
import { User } from "./User"

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column("text")
    description: string

    @Column()
    photo: string

    
    @ManyToOne(()=>User , (author)=>author.posts)
    author : User
}   