
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToMany, JoinTable } from "typeorm"
import bcrypt from 'bcrypt'
import { Post } from "./Post"

@Entity()
export class User  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string 

    @Column()
    email: string
    @Column()
    password : string 

    @ManyToMany(() => User, (user) => user.following 
    
    // ,{cascade:true}
    )
   
    followers: User[]


    @ManyToMany(() => User, (user) => user.followers 
    
    // ,{cascade:true}
    )
    @JoinTable()
    following: User[]


    @ManyToMany(() => Post , post=>post.likes,{cascade:true}
    )
    @JoinTable()
    favoritePosts: Post[]

    @OneToMany(()=>Post , (post)=>post.author 
    , { cascade: true }
    ) 
    posts:Post[] 

    public async correctPassword( candidatePassword:string ,userPassword:string) : Promise<boolean>{

      console.log('You are here ' , candidatePassword ,userPassword)
        return await bcrypt.compare(candidatePassword, userPassword);
  };

}