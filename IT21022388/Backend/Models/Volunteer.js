const mongoose = require('mongoose');

const schema = mongoose.Schema;

const volunteerSchema = new schema({

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

})

const Volunteer = mongoose.model("Volunteer",volunteerSchema);
module.exports = Volunteer;
