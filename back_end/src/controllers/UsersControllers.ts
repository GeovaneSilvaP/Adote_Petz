import { Users } from "../models/Users";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

//helpers
import { createUserToken } from "../helpers/create-user-token";
import { getToken } from "../helpers/get-token";
import { getUserByToken } from "../helpers/get-user-by-token";

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

  static async checkUser(req: Request, res: Response) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);

      if (!token) {
        return res.status(401).json({ message: "Acesso negado!" });
      }

      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string,
        ) as JwtPayload;

        const user = await Users.findById(decoded.id).select("-password");

        currentUser = user;
      } catch (err) {
        return res.status(401).json({ message: "Token inválido!" });
      }
    }

    res.status(200).send(currentUser);
  }

  static async getUsersById(req: Request, res: Response) {
    const id = req.params.id;

    const user = await Users.findById(id).select("-password");

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json(user);
  }

  static async editUsers(req: Request, res: Response) {
    const { name, email, phone, password, confirmpassword } = req.body;

    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ message: "Acesso negado!" });
    }

    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    if (req.file) {
      user.image = req.file.filename;
    }

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // NAME
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório" });
    }
    user.name = name;

    // EMAIL
    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório" });
    }

    const userExists = await Users.findOne({ email });

    if (user.email !== email && userExists) {
      return res.status(422).json({
        message: "Por favor, utilize outro e-mail!",
      });
    }

    user.email = email;

    // PHONE
    if (!phone) {
      return res.status(422).json({ message: "O telefone é obrigatório" });
    }
    user.phone = phone;

    // PASSWORD (opcional)
    if (password) {
      if (password !== confirmpassword) {
        return res.status(422).json({
          message: "As senhas precisam ser iguais!",
        });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      await user.save();

      res.status(200).json({
        message: "Usuário atualizado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }
}
