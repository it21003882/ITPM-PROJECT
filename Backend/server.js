//extra info - cors vs csp
const dotenv=require('dotenv');
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');

//load env vars
dotenv.config({ path: './config.env' });

const app=express();
app.use(express.json({ limit: '1mb' }));

//import multer
var multer = require('multer')


//import routes


const reportRoutes=require('./routes/report');
const userRoutes=require('./routes/user');
const locationRoutes=require('./routes/map');


app.use('/report',reportRoutes);
app.use('/map',locationRoutes);
app.use('/user',userRoutes);



app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());








const port =  8000 || process.url ;

const url='mongodb+srv://buddhikaSadun:sadun917@web-app.z67plor.mongodb.net/?retryWrites=true&w=majority'


app.get('/',function (req,res){

    res.send('<html><body><h1>Hello World</h1></body></html>');

});


//restrict the access of headers (adjust the response we receive)
/*
app.use((req,res) =>{

    //res.header('Access-Control-Allow-Origin','*'); //can restict the client writing a url in second field  
    //res.header("Access-Control-Allow-Headers","Origins,X-Requested-With,Content-Type,Acept,Authorization");
    if(res.header=='OPTIONS'){
        res.header("Access-Control-Allow-Headers","PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
});
*/

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

