import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';
import {passportCall} from '../utils/utils.js'
import {authorization }  from '../middlewares/auth.js';

const router = Router();

const sessionsController = new SessionsController();

router.post('/register', sessionsController.register);
router.post('/login', sessionsController.login);
router.post('/logout', sessionsController.logout);
router.get('/current', passportCall('jwt'), authorization('user'), sessionsController.getCurrentUser);


export default router;