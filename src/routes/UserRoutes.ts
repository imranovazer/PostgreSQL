import * as express from 'express'
import { UserController } from '../controllers/UserController';
import { ProtectMiddleware } from '../middleware/ProtectMiddleware';

const router = express.Router() ;


router.route('/').get(UserController.getUsers).post(UserController.createUser) ;


router.use(ProtectMiddleware)
router.post('/follow/:id', UserController.followUser);

router.delete('/unfollow/:id', UserController.unfollowUser);
export default router
