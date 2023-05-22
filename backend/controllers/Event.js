import Event from '../moduls/Event.js'

export const AddEvent = async (req, res) => {
  // console.log(req.body)
 try{
 
      const prefix = 'EID'
      const EVENT_ID = (prefix + Date.now())
      // console.log(POST_ID)

      const newEvent = new Event({
        event_id: EVENT_ID,
        event_name: req.body.event_name,
        description: req.body.description,
        time: req.body.time,
        venue: req.body.venue,
        image: req.file.originalname

      });

      const newEve = await newEvent.save();
      console.log(newEve);
      if (newEve) {
       console.log("1")
        res.status(201).json({
          message: "New Event Created Sucessfull..!",
          payload: newEve
        })
      } else {
        console.log("2")
        res.status(400).json({
          message: "Somthing Went Wrong In Post Creating..!"
        })
      } 
  } catch (error) {
    console.log("3")
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error
    })
  }
}

export const getAllEvent = async (req, res) => {
  try {
    const allEvent = await Event.find();
    if (allEvent) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: allEvent
      })
    }
  }catch(error){
    console.log(error)
  }
}

export const getOneEvent = async (req, res) => {
  try {
    let id = req.params.event_id;
    const event = await Event.findById(id);
    if (event) {
      res.status(200).json({ event });
    } else {
      res.status(404).json({ message: "No posts found for user ID " + id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateEvent = async (req, res) => {

  const id = req.params.id;

  const event_id = req.body.event_id;
  const event_name = req.body.event_name;
  const description = req.body.description;
  const time = req.body.time;
  const venue = req.body.venue;
  const image = req.file.originalname;
  
  const upadetEvent = {
    event_id,
    event_name,
    description,
    time,
    venue,
    image
  }

  // const newEvent = new Event({
  //   event_id: EVENT_ID,
  //   event_name: req.body.upevent_name,
  //   description: req.body.updescription,
  //   time: req.body.uptime,
  //   venue: req.body.upvenue,
  //   image: req.file.originalname

  // });

  const update = await Event.findByIdAndUpdate(id, upadetEvent).then(() => {
    res.status(200).send({status: "Event Updated"})
  }).catch((err) =>{
      console.log(err);
      res.status(500).send({status: "Error with updation data"});
  })

};


export const deleteEvent = (async (req,res) =>{
     let event_id = req.params.event_id;

     await Event.findByIdAndDelete(event_id).then(() => {
        res.status(200).send({status: "Event deleted"});
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
     })
})
