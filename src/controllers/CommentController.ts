import { Request ,Response } from "express";


import { Comment } from "../entity/Comment";

import { Post } from "../entity/Post";
const CommentController = {
    deleteComment: async (req:Request, res :Response) => {

        try {

            const { commentId } = req.params;
            const MyUserData = req.user;
            const deletedComment = await Comment.findByIdAndDelete(commentId);

            if (!deletedComment) {
                return res.status(400).json(
                    {
                        status: 'fail',
                        message: 'Commnent with that ID not found'
                    }
                )
            }

            // if (!deletedComment.user.equals(MyUserData._id)) {
            //     return res.status(400).json(
            //         {
            //             status: 'fail',
            //             message: 'You cannot delete the comment of other user'
            //         }
            //     )
            // }
            const deletedCommentPost = await Post.findById(deletedComment.post);

            deletedCommentPost.comments = deletedCommentPost.comments.filter(item => !item.equals(deletedComment._id))
            await deletedCommentPost.save();

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

    createComment: async (req, res) => {

        try {
            const MyUserData = req.user;
            const { postId } = req.params;

            const newComment = await Comment.create({
                text: req.body.text,
                user: MyUserData._id,
                post: postId

            });

            const postToBeCommented = await Post.findById(postId);

            postToBeCommented.comments.push(newComment._id);

            await postToBeCommented.save();

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