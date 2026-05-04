import { Router } from "express";
import { PetsController } from "../controllers/PetsControllers";

const router = Router();

router.post("/create", PetsController.create);

export default router;
