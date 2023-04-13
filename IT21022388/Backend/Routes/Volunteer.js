const router = require("express").Router();
let Volunteer = require("../Models/Volunteer");

router.route("/add").post((req,res) => {
    const full_name = req.body.full_name;
    const email_address = req.body.email_address;
    const age = req.body.age;
    const phone_number = req.body.phone_number;
    const area = req.body.area;
    const event_name =  req.body.event_name;

    const newVolunteer = new Volunteer({
        full_name,
        email_address,
        age,
        phone_number,
        area,
        event_name
    })

    newVolunteer.save()
    .then(()=>{
        res.json("Volunteer Added")    
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const { full_name, email_address, age, phone_number, area, event_name} = req.body;

    const updateVolunteer = {
        full_name,
        email_address,
        age,
        phone_number,
        area,
        event_name
    }

    const update = await Volunteer.findByIdAndUpdate(userId,updateVolunteer).then(() =>{
        res.status(200).send({status: "User Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});   
    })


})

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Volunteer.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Volunteer Deleted"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with delete Volunteer", error: err.message});
    })
})

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;

    const user = await Volunteer.findById(userId)
    .then((Volunteer) => {
        res.json(Volunteer);
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });
})

router.route("/get").get((req,res) =>{
    Volunteer.find().then((volunteer) =>{
        res.json(volunteer)
    }).catch((err) =>{
        console.log(err)
    })
})

module.exports = router;
