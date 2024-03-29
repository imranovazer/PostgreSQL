import { Response , Request } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";




export const PostController = {
  getAllPosts :async (req:Request , res:Response)=>
  {
    try {
      const allPosts = await Post.find({
        relations : {
          likes : true ,
          comments : true  ,
          author :true
        }
      }) ; 

      res.status(200).json({
        status: 'sucess' ,
        data : allPosts
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 'fail' ,
        error
      })
    }
  } ,

 
  createPost: async (req:Request, res:Response) => {
    try {
      console.log("Create post");

      //@ts-ignore
      const MyUserInfo = req.user;

      const { id: userId } = MyUserInfo;

      const { name, description , photo } = req.body;

      const newPost = new Post() ; 

      newPost.name = name ;
      newPost.description = description ;
      newPost.author = userId ;
      newPost.photo = photo  ;
      newPost.author = MyUserInfo ; 


      await newPost.save() ; 

     
     
      

      // console.log("User id who created the post", userId);

      return res.status(201).json({
        status: "sucess",
        data: newPost,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "fail",
        error,
      });
    }
  },
  deletePost : async (req:Request , res :Response)=>
  {

    try {
        const postToDelete = await Post.findOneBy({id: parseInt(req.params.id)})
        
        await    postToDelete?.remove()


        res.status(200).json({
            status : 'sucess' ,
            message : 'Post deleted successfully'
        })
    } catch (error) {
        res.status(500) .json({
            status : 'fail', 
            error
        })
    }
        
  }, 
  likePost: async (req :Request, res :Response) => {
    try {
      console.log("Like post");
      //@ts-ignore
      const MyUserData:User = req.user;
      // console.log(MyUserData)
      const postToLikeId = req.params.id;
      const  postToLike = await Post.findOneBy({id:parseInt(postToLikeId)});

      if(!postToLike)
      {
         return res.status(400).json(
          {
            status : 'fail'  ,
            message : "Post with that ID not found"

          }
        )
      }


      const isAlreadyLiked:boolean = MyUserData.favoritePosts.some(item=>item.id===postToLike?.id)
      
      if (isAlreadyLiked) {

        
        return res.status(400).json({
          status: "fail",
          message: "Post already liked by you",
        });
      }
      

      MyUserData.favoritePosts.push(postToLike)
      await MyUserData.save();

      return res.status(200).json({
        status: "sucess",
        message: "Post liked sucessfully",
        post: postToLike,
      });
    } catch (err) {
      // console.log("WHAT AN ERROR  ", err);
      res.status(500).json({
        status: "fail",
        error: err,
      });
    }
  } ,
  unlikePost: async (req:Request, res:Response) => {
    try {
      console.log("Dislike post");

      //@ts-ignore
      const MyUserData:User = req.user;
      const postToLikeId = req.params.id;

      MyUserData.favoritePosts = MyUserData.favoritePosts.filter(
        (item) => item.id!==parseInt(postToLikeId)
      );

      await MyUserData.save();

      return res.status(200).json({
        status: "sucess",
        message: "Post unkliked sucessfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error: error,
      });
    }
  },
//   getFollowingUserPosts: async (req, res) => {
//     try {
//       const MyUserData = req.user;
//       const following = MyUserData.following;
//       const followingPosts = await Post.find({ author: { $in: following } })
//         .sort("-createdAt")
//         .populate("author likes comments");
//       return res.status(200).json({
//         status: "sucess",
//         data: followingPosts,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         status: "fail",
//         error,
//       });
//     }
//   },
//   getAllNotMyPosts: async (req, res) => {
//     try {
//       const MyUserData = req.user;

//       const allPosts = await Post.find({ author: { $ne: MyUserData._id } })
//         .sort("-createdAt")
//         .populate("author likes comments");
//       return res.status(200).json({
//         status: "sucess",
//         data: allPosts,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         status: "fail",
//         error,
//       });
//     }
//   },
};
