import { Router } from "express";
import { UserControllers } from "../controllers/UsersControllers";

const router = Router();

router.post("/register", UserControllers.register);

export default router;
