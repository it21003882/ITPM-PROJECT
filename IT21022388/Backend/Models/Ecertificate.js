const mongoose = require('mongoose');

const schema = mongoose.Schema;

const ecertificateSchema = new schema({

    full_name : {
        type: String,
        required: true
    },
    event_name : {
        type: String,
        required: true
    },

})

const Ecertificate = mongoose.model("E_certificate",ecertificateSchema);
module.exports = Ecertificate;