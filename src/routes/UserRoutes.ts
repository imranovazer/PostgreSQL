import * as express from 'express'
import { UserController } from '../controllers/UserController';

const router = express.Router() ;


router.route('/').get(UserController.getUsers).post(UserController.createUser) ;


export default router

