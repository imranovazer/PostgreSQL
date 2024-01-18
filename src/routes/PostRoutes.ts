const express = require('express');
import { PostController } from "../controllers/PostController";
import { ProtectMiddleware } from "../middleware/ProtectMiddleware";



const router = express.Router();



router.use(ProtectMiddleware);



router.route('/').post( PostController.createPost);

router.route('/:id').delete(PostController.deletePost)


export default router