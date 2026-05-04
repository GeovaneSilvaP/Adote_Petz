import { Router } from "express";
import { PetsController } from "../controllers/PetsControllers";

//middlewares
import { checkToken } from "../helpers/verify-token";

const router = Router();

router.post("/create", PetsController.create);

export default router;
