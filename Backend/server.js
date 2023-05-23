//extra info - cors vs csp
const dotenv=require('dotenv');
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();


app.use('/uploads',express.static('uploads'));
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());


//load env vars
dotenv.config({ path: './config.env' });


app.use(express.json());


//import routes


const reportRoutes=require('./routes/report');
const userRoutes=require('./routes/user');
const locationRoutes=require('./routes/map');


app.use('/report',reportRoutes);
app.use('/map',locationRoutes);
app.use('/user',userRoutes);



const port =  8000 || process.url ;

const url='mongodb+srv://buddhikaSadun:sadun917@web-app.z67plor.mongodb.net/?retryWrites=true&w=majority'



app.get('/',function (req,res){

    res.send('<html><body><h1>Hello World</h1></body></html>');

});




//connect the database

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);

})

mongoose.Promise = global.Promise;



  

app.listen(port,()=>{
    console.log(`app is running on: ${port}`);
})
