const express = require('express');
import { PostController } from "../controllers/PostController";
import { ProtectMiddleware } from "../middleware/ProtectMiddleware";



const router = express.Router();



router.use(ProtectMiddleware);



router.route('/').get(PostController.getAllPosts).post( PostController.createPost);
router.post('/like/:id', PostController.likePost);
router.delete('/unlike/:id', PostController.unlikePost);

router.route('/:id').delete(PostController.deletePost)

export default router