import mongoose from "mongoose";

const schema = mongoose.Schema;

const donationSchema = new schema({

    donate_id :{
        type:String,
        required: true
    },
    full_name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    donate_description : {
        type: String,
        required: true
    },
    amount : {
        type: String,
        required: true
    },
})

export default mongoose.model("Donation",donationSchema);
