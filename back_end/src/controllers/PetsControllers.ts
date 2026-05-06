import { Request, Response } from "express";
import { Pets } from "../models/Pets";
import mongoose from "mongoose";

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

  static async getAllUsersPets(req: Request, res: Response) {
    const token = getToken(req);

    if (!token) {
      return res.status(404).json({ message: "Acesso negado!" });
    }

    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const pets = await Pets.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({ pets });
  }

  static async getAllUsersAdoptions(req: Request, res: Response) {
    const token = getToken(req);

    if (!token) {
      return res.status(404).json({ message: "Acesso negado!" });
    }

    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const pets = await Pets.find({ "adopter._id": user._id }).sort(
      "-createdAt",
    );

    res.status(200).json({ pets });
  }

  static async getPetById(req: Request, res: Response) {
    const { id } = req.params;

    // valida se existe e é string
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "ID inválido!" });
    }

    // valida formato ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    try {
      const pet = await Pets.findById(id);

      if (!pet) {
        return res.status(404).json({ message: "Pet não encontrado!" });
      }

      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar pet" });
    }
  }

  static async removePetById(req: Request, res: Response) {
    const { id } = req.params;

    // valida id
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "ID inválido!" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    try {
      const pet = await Pets.findById(id);

      if (!pet) {
        return res.status(404).json({ message: "Pet não encontrado!" });
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

      // VERIFICA DONO
      if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(403).json({
          message: "Usuário não autorizado!",
        });
      }

      // DELETE
      await Pets.findByIdAndDelete(id);

      res.status(200).json({
        message: "Pet removido com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover pet" });
    }
  }
}
