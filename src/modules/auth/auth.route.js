import { Router } from 'express';
import authCtrl from './auth.controller.js';
import { signupSchema, loginSchema } from './auth.validator.js';
import { bodyValidator } from '../../middlewares/request-validator.middleware.js';
import checkLogin from '../../middlewares/auth.middleware.js';

const authRouter = Router();
           
authRouter.post('/signup', bodyValidator(signupSchema), authCtrl.signup);
authRouter.post('/login', bodyValidator(loginSchema), authCtrl.login);
authRouter.get('/profile', checkLogin, authCtrl.getProfile);
authRouter.post('/logout', checkLogin, authCtrl.logout); 
 
export default authRouter;
