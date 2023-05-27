import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
import stripePackage from "stripe";

const stripe = stripePackage("sk_test_51N0lfXFXk7msLsjQ6vw8w5kINoWWGsj9QQx9ysglHl13PVHbvAuaLALLmpIZOUkmAHWz8uxaRSy8VIENCeen9QFZ00SAcHSDTZ");

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

//Methmal 
import Donate from "./routers/Donate.js";
app.use("/donate", Donate);

app.post("/payemnt",(req,res) => {
  const {products, token} = req.body;
  console.log("Product",products);
  console.log("Price",products.price);

  const idempontencyKey = uuid();

  return stripe.customers.create({
      email: token.email,
      source:token.id
  }).then(customer => {
      stripe.charges.create({
          amount: products.price * 1000,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: products.name,
          shipping:{
              name:token.card.name,
              address:{
                  country:token.card.address_country
              }
          }
      },{idempontencyKey})
  }).then(result => res.status(200).json(result))
  .catch(err => console.log(err))
})

//Buddhika
import Form from "./routers/Form.js";
app.use("/report", Form);

import Map from "./routers/Map.js";
app.use("/map", Map);
