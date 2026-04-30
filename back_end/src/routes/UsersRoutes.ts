import { Router } from "express";
import { UserControllers } from "../controllers/UsersControllers";

//middleware
import { checkToken } from "../helpers/verify-token";

const router = Router();

router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);
router.get("/checkuser", UserControllers.checkUser);
router.get("/:id", UserControllers.getUsersById);
router.patch("/edit/:id", checkToken, UserControllers.editUsers);

export default router;
