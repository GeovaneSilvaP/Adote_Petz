import { Users } from "../models/Users";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUserToken } from "../helpers/create-user-token";

export class UserControllers {
  static async register(req: Request, res: Response) {
    const { name, email, phone, password, confirmpassword } = req.body;

    //validations
    if (!name) {
      res.status(422).json({ message: "O nome é óbrigatorio" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é óbrigatorio" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é óbrigatorio" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é óbrigatorio" });
      return;
    }

    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmação de senha é óbrigatorio" });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais!",
      });
      return;
    }

    //check if user exists
    const userExists = await Users.findOne({ email: email });

    if (userExists) {
      res.status(422).json({
        message: "Por favor, utilize outro e-mail!",
      });
      return;
    }

    //create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create a user
    const user = new Users({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(
        { id: newUser._id.toString(), name: newUser.name },
        req,
        res,
      );
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O email é óbrigatorio" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é óbrigatorio" });
      return;
    }

    //check if user exists
    const user = await Users.findOne({ email: email });

    if (!user) {
      res.status(422).json({
        message: "Não há usuário cadastrado com esse email!",
      });
      return;
    }

    //check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha Inválida!" });
      return;
    }
  }
}
