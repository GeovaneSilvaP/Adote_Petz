import { Router } from "express";
import { PetsController } from "../controllers/PetsControllers";

//middlewares
import { checkToken } from "../helpers/verify-token";
import { imageUpload } from "../helpers/image-upload";

const router = Router();

router.post(
  "/create",
  checkToken,
  imageUpload.array("images"),
  PetsController.create,
);

router.get("/", PetsController.getAll)

export default router;
