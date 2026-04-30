import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getToken } from "./get-token";

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = verified;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido!" });
  }
};