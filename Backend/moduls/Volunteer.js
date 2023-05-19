import mongoose from "mongoose";

const schema = mongoose.Schema;

const volunteerSchema = new schema({

    volunteer_id:{
        type:String,
        required: true
    },
    full_name : {
        type: String,
        required: true
    },
    email_address : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    phone_number : {
        type: String,
        required: true
    },
    area : {
        type: String,
        required: true
    },
    event_name : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true
    },
   

})

export default mongoose.model("volunteer",volunteerSchema);
