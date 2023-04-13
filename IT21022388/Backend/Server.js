const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const bodyParse = require('body-parser');
const UserRouter = require("./Routes/User.js");
const VolunteerRouter = require("./Routes/Volunteer.js");
const EventRouter = require("./Routes/Event.js");

require('dotenv').config();

const PORT = process.env.PORT || 8050 //create a port variable and assign env file port number

app.use(cors());
app.use(bodyParse.json());
app.use("/User", UserRouter);
app.use("/Volunteer", VolunteerRouter);
app.use("/Event", EventRouter);


const URL = process.env.MONGO_DB; //assign the env file mongo db url

mongoose.connect(URL,{

})
//create connection between my computer port and mongo db
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB connection success!") //using this command we can pring messages in terminal
})

app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`) //this will display the running port
})
/*
const EventRouter = require("./Routes/Event.js");
app.use("/Event", EventRouter);

const EcertificateRouter = require("./Routes/Ecertificate.js");
app.use("/Ecertificate", EcertificateRouter);

const VolunteerRouter = require("./Routes/Volunteer.js");
app.use("/Volunteer", VolunteerRouter);
*/




