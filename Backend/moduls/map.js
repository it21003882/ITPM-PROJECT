import mongoose from "mongoose";

const schema = mongoose.Schema;
const locationSchema = new schema({
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//locationSchema.index({ location: '2dsphere' });

export default mongoose.model("Location", locationSchema);
