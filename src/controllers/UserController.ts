import { Response, Request } from "express";

import { User } from "../entity/User";
import bcrypt from 'bcrypt'







export const UserController = {
  createUser: async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
      const user = new User();
      user.username = username;
      user.email = email;

      const hashedPassword = await bcrypt.hash(password, 12)
      user.password = hashedPassword ; 


      
      await user.save() ;
      return res.status(200).json({
        status: "sucess",
        message: "New user crated sucessfuly",
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        error,
      });
    }
  },
  getUsers: async(req: Request, res: Response) => {

    try {

      const users =  await User.find({relations:{
        posts:true ,
        followers:true ,
        following:true
      }}) ; 
    return res.status(200).json({
      status: "sucess",
      data  : users 
    });
      
    } catch (error) {
      res.status(500).json({
        status : 'fail' ,
        error
      })
    }
    
  },
  followUser: async (req:Request, res:Response) => {
    console.log('Follow');

    try {
      //@ts-ignore
      const MyUserData:User = req.user;

        const userToFollow = await User.findOneBy({id:parseInt(req.params.id)});
        if(!userToFollow)
        {
          return res.status(400).json(
            {
              message : 
              "User with that ID to follow not found"
            }
          )
        }



        if (MyUserData.id === userToFollow.id) {
            return res.status(400).json(
                {
                    status: 'fail',
                    message: ' You can not follow yourself'
                }
            )
        }
        MyUserData.following.push(userToFollow);
        await MyUserData.save();
        return res.status(200).json(
            {
                status: 'sucess',
                message: 'user followed successfully!'
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                status: 'fail',
                error
            }
        )
    }

},
unfollowUser: async (req:Request, res:Response) => {

  try {
      console.log('Unfollow');



      //@ts-ignore
      const MyUserData :User = req.user;
      const userToUnfollowId = parseInt(req.params.id ); 

      


      if (MyUserData.id ===userToUnfollowId) {

          return res.status(400).json(
              {
                  status: 'fail',
                  message: ' You can not unfollow yourself'
              }
          )
      }
      

      MyUserData.following = MyUserData.following.filter(item => item.id !==userToUnfollowId);

      await MyUserData.save();

      return res.status(200).json(
          {
              status: 'sucess',
              message: 'User unsubscibed successfully!'
          }
      )

  } catch (error) {
      console.log(error);
      return res.status(500).json(
          {
              status: 'fail',
              error
          }
      )
  }

}
};
