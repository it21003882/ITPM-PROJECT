const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({

    NIC:{
        type:Number,
        required:true
    },
    ContactNo:{
        type:String,
        required:true
    },
    WasteType:{
        type:[String],  
        required:false,
        default:[],
    },
    
    location:{
        type:String,
        required:false
    },
    Evidence:{
        // data:Buffer,
        //contentType:String
        type:String,
        required:false
     },
   
})



module.exports=mongoose.model('Report',reportSchema);
