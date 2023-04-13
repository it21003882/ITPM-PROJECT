const router = require("express").Router();
let User = require("../Models/User");

router.route("/add").post((req,res) => {
    const email_address = req.body.email_address;
    const password = req.body.password;

    const newUser = new User({
        email_address,
        password
        
    })

    newUser.save()
    .then(()=>{
        res.json("User Added")    
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {email,password} = req.body;

    const updateUser = {
        email,
        password
        
    }

    const update = await User.findByIdAndUpdate(userId,updateUser).then(() =>{
        res.status(200).send({status: "User Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});   
    })


})

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await User.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with delete User", error: err.message});
    })
})

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;

    const user = await User.findById(userId)
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });
})

router.route("/get").get((req,res) =>{
    User.find().then((user) =>{
        res.json(user)
    }).catch((err) =>{
        console.log(err)
    })
})

module.exports = router;
