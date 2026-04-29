import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import { connectDB } from "./db/conn";
import usersRoutes from "./routes/UsersRoutes";

const app = express();
const port = 5000;
dotenv.config();

//DataBase
connectDB();

//Config JSON response
app.use(express.json());

//Salve cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//public folder for images
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
