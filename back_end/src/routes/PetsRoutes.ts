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

router.get("/", PetsController.getAll);
router.get("/mypets", checkToken, PetsController.getAllUsersPets);
router.get("/myadoptions", checkToken, PetsController.getAllUsersAdoptions);
router.get("/:id", PetsController.getPetById);
router.delete("/:id", checkToken, PetsController.removePetById);
router.patch(
  "/:id",
  checkToken,
  imageUpload.array("images"),
  PetsController.updatePet,
);
router.patch("/schedule/:id", checkToken, PetsController.schedule);
router.patch("/conclude/:id", checkToken, PetsController.concludeAdoption);

export default router;
