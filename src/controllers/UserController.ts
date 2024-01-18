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
        posts:true
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
};
