import express from 'express';
import { loginUser, userRegister, adminLogin, adminRegister } from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminRegister);
userRouter.post('/admin/login', adminLogin);


export default userRouter;