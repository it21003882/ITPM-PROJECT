const mongoose = require('mongoose');

const schema = mongoose.Schema;

const eventSchema = new schema({

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

const Event = mongoose.model("Event",eventSchema);
module.exports = Event;