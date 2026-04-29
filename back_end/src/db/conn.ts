import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Conectado ao MongoDB!");
  } catch (err) {
    console.log("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
}
