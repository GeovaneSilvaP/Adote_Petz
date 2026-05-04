import { Router } from "express";
import { UserControllers } from "../controllers/UsersControllers";

//middleware
import { checkToken } from "../helpers/verify-token";
import { imageUpload } from "../helpers/image-upload";

const router = Router();

router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);
router.get("/checkuser", UserControllers.checkUser);
router.get("/:id", UserControllers.getUsersById);
router.patch(
  "/edit/:id",
  checkToken,
  imageUpload.single("image"),
  UserControllers.editUsers,
);

export default router;
