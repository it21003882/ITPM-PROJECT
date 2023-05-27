import Map from "../moduls/Map.js";

// Serve uploaded images statically
//router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes

export const createMap = async (req, res, next) => {
  try {
    const map = JSON.parse(address);

    const result = await map.save();
    console.log(result);

    if (result) {
      res.status(200).json({ message: "Address added successfully" });
    }
  } catch (error) {
    console.error("Error parsing address:", error);
    // Send an error response
    res.status(400).json({ error: "Invalid address data" });
  }
};

// Retrieve a single record by id
export const getSingleMap = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Map.findById(id).exec();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// Retrieve all profile details
// router.get("/")

export const GetAllMap = async (req, res) => {
  try {
    const result = await Map.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// Update by id

// Delete by id

export const DeleteMarker = async (req, res) => {
  try {
    const deletedMarker = await Map.findByIdAndRemove(req.params.id).exec();
    return res.json({
      message: "Deleted successfully",
      deletedMarker,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Deleted unsuccessful",
      error: err,
    });
  }
};
