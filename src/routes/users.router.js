import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';

const router = Router();

router.get("/", UsersController.getAllUsers);
router.get("/:uid", UsersController.getUserById);
router.put("/:uid", UsersController.updateUserById);
router.delete("/:uid", UsersController.deleteUserById);

export default router;