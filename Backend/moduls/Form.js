import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  NIC: {
    type: Number,
  },
  ContactNo: {
    type: String,
  },
  WasteType: {
    type: [String],
    default: [],
  },

  Evidence: {
    type: String,
  },
});

export default mongoose.model("Report", reportSchema);
