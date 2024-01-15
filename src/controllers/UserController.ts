import { Response, Request } from "express";

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);






export const UserController = {
  createUser: async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, age } = req.body;
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.age = age;
      await userRepository.save(user);
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
  getUsers: (req: Request, res: Response) => {
    return res.status(200).json({
      status: "sucess",
      message: "The list of users",
    });
  },
};
