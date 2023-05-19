const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  
  Pid:{
    type: String,
    required:true,
  },

  Address:{
    type:String,
    required: true
  },
  /*
  city: {
    type: String,
    required: false
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
    
    },
    formattedAddress:String

  },
*/
  createdAt:{
    type:Date,
    default:Date.now
  },
})

locationSchema.index({ location: '2dsphere' });


module.exports = mongoose.model('Location', locationSchema);
