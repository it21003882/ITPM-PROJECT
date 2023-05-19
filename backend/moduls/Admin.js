import mongoose from "mongoose";

const schema = mongoose.Schema;

const adminSchema = new schema({

    admin_id :{
        type:String,
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

})

export default mongoose.model("admin",adminSchema);
