import { Router } from "express";
import { UserControllers } from "../controllers/UsersControllers";

const router = Router();

router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);
router.get("/checkuser", UserControllers.checkUser);
router.get("/:id", UserControllers.getUsersById);

export default router;
