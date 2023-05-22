import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const filePath = fileURLToPath(import.meta.url);
const dirName = path.dirname(filePath);
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(dirName, "uploads")));
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGO_DB;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log("***************************************");
  console.log(`Server Running on port number : ${PORT}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGO_DB Connection successfull......!!");
  console.log("***************************************");
});


//amanda
import Event from "./routers/Event.js";
app.use("/event", Event);

import Volunteer from "./routers/Volunteer.js";
app.use("/volunteer", Volunteer);

import User from "./routers/User.js";
app.use("/user", User);

import Admin from "./routers/Admin.js";
app.use("/admin", Admin);

import Certificate from "./routers/E-Certificate.js";
app.use("/certificate", Certificate);

