import { Request ,Response } from "express";


import { Comment } from "../entity/Comment";

import { Post } from "../entity/Post";
const CommentController = {
    deleteComment: async (req:Request, res :Response) => {

        try {

            const { commentId } = req.params;
            //@ts-ignore
            const MyUserData = req.user;

                const deletedComment =  await Comment.findOne({
                    where: {
                        id: parseInt(commentId),
                    },
                    relations: {
                        user: true,
                    },
                })

                

            if (!deletedComment) {
                return res.status(400).json(
                    {
                        status: 'fail',
                        message: 'Commnent with that ID not found'
                    }
                )
            }
            if(deletedComment.user.id!==MyUserData.id)
            {
                return res.status(400).json(
                    {
                        status: 'fail',
                        message: 'You cannot delete the comment of other user'
                    }
                )
            }

           
            deletedComment.remove() ;
            return res.status(200).json(
                {
                    staus: 'sucess',
                    data: deletedComment
                }
            )

        } catch (error) {
            console.log(error);
            res.status(500).json(
                {
                    status: 'fail',
                    error
                }
            )
        }



    },

    createComment: async (req:Request, res:Response) => {

        try {
            //@ts-ignore
            const MyUserData = req.user;
            const { postId } = req.params;


            const postToBeCommented = await Post.findOneBy({id:parseInt(postId)})

            if(postToBeCommented)
            {
                var newComment =new Comment() ; 
                newComment.text =req.body.text 
                newComment.user= MyUserData ,
                newComment.post = postToBeCommented
                await newComment.save() ;

            }
            else {
                return res.status(400).json({
                    status: 'fail',
                    message: "Post with that id not found"
                });

            }
           
            return res.status(201).json({
                status: 'Sucess',
                data: newComment
            });


        } catch (error) {
            console.log(error);
            res.status(500).json(
                {
                    status: 'fail',
                    error
                }
            )
        }
    }
}

module.exports = CommentController; 