import Donate from '../moduls/Donation.js'

export const AddDonate = async (req, res) => {
  // console.log(req.body)
 try{
 
      const prefix = 'DID'
      const donateID = (prefix + Date.now())
      // console.log(POST_ID)
      
      const newVol = new Donate({
        donate_id: donateID,
        full_name: req.body.full_name,
        email: req.body.email,
        donate_description: req.body.donate_description,
        amount: req.body.amount
      });

      const newV = await newVol.save();
      console.log(newV);
      if (newV) {
      
        res.status(201).json({
          message: "New Donate Created Sucessfull..!",
          payload: newV
        })
      } else {

        res.status(400).json({
          message: "Somthing Went Wrong In Post Creating..!"
        })
      } 
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error
    })
  }
}

export const getAllDonate = async (req, res) => {
  try {
    const allVol = await Donate.find();
    if (allVol) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: allVol
      })
    }
  }catch(error){
    console.log(error)
  }
}

export const getOneDonate = async (req, res) => {
  try {
    let id = req.params.donate_id;
    const Vol = await Donate.findById(id);
    if (Vol) {
      res.status(200).json({ Vol });
    } else {
      res.status(404).json({ message: "No posts found for user ID " + id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateDonate = async (req, res) => {
  
  const id = req.params.id;

  const full_name = req.body.full_name;
  const email = req.body.email;
  const donate_description = req.body.donate_description;
  const amount = req.body.amount

  const upadetVol = {
    full_name,
    email,
    donate_description,
    amount
  }

  try {
      const upadetdVoln = await Donate.findByIdAndUpdate(id, upadetVol, { new: true });
      if (upadetdVoln) {
          res.status(200).send({ status: "Post Updated", data: upadetdVoln });
      } else {
          res.status(404).send({ status: "Post not found" });
      }
  } catch (err) {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
  }
};


export const deleteDonate = (async (req,res) =>{
     let donate_id = req.params.donate_id;

     await Donate.findByIdAndDelete(donate_id).then(() => {
        res.status(200).send({status: "Event deleted"});
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
     })
})
