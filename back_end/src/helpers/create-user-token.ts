import jwt from "jsonwebtoken";
import { Request, Response } from "express";

type Users = {
  id: string;
  name: string;
};

export const createUserToken = async (
  user: Users,
  req: Request,
  res: Response,
) => {
  //create a token
  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  //return token
  res
    .status(200)
    .json({ message: "Você está autendicado", token, userId: user.id });
};
