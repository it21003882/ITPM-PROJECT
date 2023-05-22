import mongoose from "mongoose";

const schema = mongoose.Schema;

const eventSchema = new schema({

    event_id :{
        type:String,
        required: true
    },
    event_name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    time : {
        type: String,
        required: true
    },
    venue : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    },
   

})

export default mongoose.model("Event",eventSchema);
