import jwt from "jsonwebtoken";
import { Users } from "../models/Users";

type TokenPayload = {
  id: string;
  name: string;
};

export const getUserByToken = async (token: string) => {

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as TokenPayload;

  const userId = decoded.id;

  const user = await Users.findOne({ _id: userId });

  return user;
};
