import { Request, Response } from "express";
import { Pets } from "../models/Pets";

export class PetsController {
  static async create(req: Request, res: Response) {
    res.json({message: "O Pets deu certo"})
  }
}
