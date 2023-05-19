
const router = require('express').Router();
const Report = require('../models/report');
const express=require('express');
const path=require('path');
const multer =require('multer');
//const router=express();
const checkAuth = require('../middleawre/check-auth')



//// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Create Multer instance
const upload = multer({ storage: storage });

// Serve uploaded images statically
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));








//Routes



router.post("/save", upload.single('Evidence'),(req, res, next) => {
   //console.log(req.file);
   //const imageURL = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
    const report = new Report({
       NIC: req.body.NIC,
       ContactNo:req.body.ContactNo,
       WasteType:req.body.WasteType,
      // Evidence: req.file.path 
    });
    report
      .save()
      .then(result => {
        console.log(result);
        res.status(201).send(`${result}`)
      })

      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });




//retrieve a  single record by id
router.get('/:id',(req, res) => {

    const id = req.params.id;

    Report.findById(id)
    .exec()
    .then(data =>{
        //if(id > 200){
        //console.log("from database",data.id); //display single data element
        //res.status(200).json(data);
        res.send(data);
      //  }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
    
});


//retreive all profile details

router.get("/",async(req,res) =>{
    Report.find({} ,
    (err,result)=>{
        if(err){
            res.send(err)
        }

        res.send(result);
    });
});


/*
router.get("/", (req, res, next) => {
    Report.find()
      .select("NIC ContactNo WasteType Evidence")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return { 
              NIC: doc.NIC,
              ContactNo:doc.ContactNo,
              WasteType:doc.WasteType,
              Evidence:doc.Evidence
              
            };
          })
        };
        //   if (docs.length >= 0) {
        //res.status(200).json(response);
       res.send(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
*/

//update by id
router.put('/update/:id',(req,res)=>{

    Report.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,profile)=>{
            if(err){
                
                return res.status(400).json({error:err});
            }

                return res.status(200).json({
                    success:"Updated successfully",
                    
                });
        }
    );
});

//delete by id


router.delete('/delete/:id',(req,res) =>{

    const pId = req.params.id;

    Report.findByIdAndRemove(pId).exec((err,deletedProfile)=>{

    if(err) 
        return res.status(404).json({
            message:"Deleted unseccesfull",err
            
        });
    
        return res.json({
            message:"Deleted successfully",deletedProfile
        });
    });

});












module.exports = router;