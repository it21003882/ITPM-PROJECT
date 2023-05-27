import mongoose from "mongoose";
import Report from "../moduls/Form.js";

export const createReport = async (req, res) => {
  console.log(req.body);
  try {
    const report = new Report({
      NIC: req.body.NIC,
      ContactNo: req.body.ContactNo,
      WasteType: req.body.WasteType,
      Evidence: req.body.Evidence,
    });

    const create = await report.save();
    console.log(create);
    if (create) {
      res.status(201).json({
        message: "New Report Created Sucessfull..!",
        payload: create,
      });
    } else {
      res.status(400).json({
        message: "Somthing Went Wrong In Post Creating..!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// Retrieve a single record by id
export const getSingleForm = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Report.findById(id).exec();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// Retrieve all profile details
// router.get("/")

export const GetAllForms = async (req, res) => {
  try {
    const result = await Report.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// Update by id

export const UpdateReport = async (req, res) => {
  try {
    const updatedProfile = await Report.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: "Updated successfully",
      profile: updatedProfile,
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

// Delete by id

export const DeleteReport = async (req, res) => {
  try {
    const deletedProfile = await Report.findByIdAndRemove(req.params.id).exec();
    return res.json({
      message: "Deleted successfully",
      deletedProfile,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Deleted unsuccessful",
      error: err,
    });
  }
};
