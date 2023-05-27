import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({

    user_id :{
        type:String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    phone_number : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    },
   

})

export default mongoose.model("User",userSchema);
