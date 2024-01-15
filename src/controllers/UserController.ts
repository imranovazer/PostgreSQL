 import { Response, Request } from "express"
    
    export const UserController = {
        createUser:(req:Request,res:Response)=>
        {

            try {
                return res.status(200).json({
                    status:'sucess' ,
                    message : 'New user crated sucessfuly'
                   })
                
            } catch (error) {
                return res.status(500).json(
                    {
                        status : 'fail' , 
                        error 
                    }
                )
            }
           
        } ,
        getUsers:(req:Request,res:Response)=>
        {
           return res.status(200).json({
            status:'sucess' ,
            message : 'The list of users'
           })
        }
    }