import { Request, Response } from "express";
import { Pets } from "../models/Pets";

// helpers
import { getToken } from "../helpers/get-token";
import { getUserByToken } from "../helpers/get-user-by-token";

export class PetsController {
  static async create(req: Request, res: Response) {
    const { name, age, weight, color } = req.body;

    const available = true;

    // VALIDATIONS
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório!" });
    }

    if (!age) {
      return res.status(422).json({ message: "A idade é obrigatória!" });
    }

    if (!weight) {
      return res.status(422).json({ message: "O peso é obrigatório!" });
    }

    if (!color) {
      return res.status(422).json({ message: "A cor é obrigatória!" });
    }

    // TOKEN
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ message: "Acesso negado!" });
    }

    // USER
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // IMAGENS
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(422).json({
        message: "A imagem é obrigatória!",
      });
    }

    const images: string[] = [];

    (req.files as Express.Multer.File[]).forEach((file) => {
      images.push(file.filename);
    });

    // CREATE PET
    const pet = new Pets({
      name,
      age,
      weight,
      color,
      available,
      images,
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    try {
      const newPet = await pet.save();

      res.status(201).json({
        message: "Pet cadastrado com sucesso!",
        newPet,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao cadastrar pet",
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    const pets = await Pets.find().sort("-createdAt");

    res.status(200).json({ pets: pets });
  }
}
