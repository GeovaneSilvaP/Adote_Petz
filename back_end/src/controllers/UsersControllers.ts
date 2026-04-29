import { Users } from "../models/Users";
import { Request, Response } from "express";

export class UserControllers {
  static async register(req: Request, res: Response) {
    res.json("Olá Get a Pet")
  }
}
