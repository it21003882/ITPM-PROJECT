const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = new schema({

    email_address : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
   

})

const user = mongoose.model("User",UserSchema);
module.exports = user;
