import {Router} from 'express';
import {getUserbyIdController, createUserController, updateUserController, deleteUserController,getAllUsersController} from '../controllers/userController';
import { validateOneUser } from '../middleware/usrid_mid';
import { compareCredentialController } from '../controllers/credentialController';
const router: Router = Router();

router.get("/",getAllUsersController);
router.get("/:id",validateOneUser,getUserbyIdController);
router.post("/register",  createUserController);
router.post("/login",compareCredentialController);

export default router;
