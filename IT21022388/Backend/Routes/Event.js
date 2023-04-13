const router = require("express").Router();
let Event = require("../Models/Event");

router.route("/add").post((req,res) => {
    const event_name = req.body.event_name;
    const description = req.body.description;
    const time = req.body.time;
    const venue = req.body.venue;
    const image = req.body.image;

    const newEvent = new Event({
        event_name,
        description,
        time,
        venue,
        image
    })

    newEvent.save()
    .then(()=>{
        res.json("Event Added")    
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const { event_name, description, time, venue, image} = req.body;

    const updateEvent = {
        event_name,
        description,
        time,
        venue,
        image
    }

    const update = await Event.findByIdAndUpdate(userId,updateEvent).then(() =>{
        res.status(200).send({status: "Event Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating Event"});   
    })


})

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Event.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Event Deleted"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with delete Event", error: err.message});
    })
})

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;

    const user = await Event.findById(userId)
    .then((Event) => {
        res.json(Event);
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });
})

router.route("/get").get((req,res) =>{
    Event.find().then((event) =>{
        res.json(event)
    }).catch((err) =>{
        console.log(err)
    })
})

module.exports = router;