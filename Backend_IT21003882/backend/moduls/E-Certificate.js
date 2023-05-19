import mongoose from "mongoose";

const schema = mongoose.Schema;

const certificateSchema = new schema({

    certificate_id :{
        type:String,
        required: true
    },
    full_name : {
        type: String,
        required: true
    },
    event_name : {
        type: String,
        required: true
    },
    email_address:{
        type:String,
        required: true
    }

})

export default mongoose.model("certificate",certificateSchema);
