import Volunteer from '../moduls/Volunteer.js'

export const AddVolunteer = async (req, res) => {   //volunteer add krnwa
  // console.log(req.body)
 try{
 
      const prefix = 'VID'    //volunteer id eka auto generate wenawa
      const volunteerId = (prefix + Date.now())
      // console.log(POST_ID)
      const ans = 'No'

      const newVol = new Volunteer({      //volunteer details tika frontend eken aran aluth volunteer object eka hdnwa
        volunteer_id: volunteerId,
        full_name: req.body.full_name,
        email_address: req.body.email_address,
        age: req.body.age,
        phone_number: req.body.phone_number,
        area: req.body.area,
        event_name: req.body.event_name,
        status: ans

      });

      const newV = await newVol.save();  //aluthen hdpu new volunteer object eka db ekta save krnwa
      console.log(newV);
      if (newV) {
      
        res.status(201).json({
          message: "New Volunteer Created Sucessfull..!",
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

export const getAllVolunteer = async (req, res) => { //view all volunteer details
  try {
    const allVol = await Volunteer.find();
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

export const getOneValounteer = async (req, res) => {      //view one volunteer details
  try {
    let id = req.params.volunteer_id;
    const Vol = await Volunteer.findById(id);
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

export const updateVolunteer = async (req, res) => {   //update volunteer details
  
  const id = req.params.id;

  const full_name = req.body.full_name;   //frontend eken ena values assign krgannwa
  const email_address = req.body.email_address;
  const age = req.body.age;
  const phone_number = req.body.phone_number;
  const area = req.body.area;
  const event_name = req.body.event_name;
  const status = req.body.status

  const upadetVol = {
    full_name,
    email_address,
    age,
    phone_number,
    area,
    event_name,
    status
  }

  try {
      const upadetdVoln = await Volunteer.findByIdAndUpdate(id, upadetVol, { new: true });
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


export const deleteVolunteer = (async (req,res) =>{   //volunteer delete
     let volunteer_id = req.params.volunteer_id;

     await Volunteer.findByIdAndDelete(volunteer_id).then(() => {
        res.status(200).send({status: "Event deleted"});
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
     })
})
