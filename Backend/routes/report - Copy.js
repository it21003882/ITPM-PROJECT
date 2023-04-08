const express = require('express');
const Report = require('../models/report');
const router = express.Router();
const mongoose = require("mongoose");
const multer =require('multer');

const checkAuth = require('../middleawre/check-auth')
//const upload =multer({dest:'./uploads/'});
//const {authEmp,authNum} = require('../middleawre/role-auth');

//configure the way of storing file

const storage= multer.diskStorage({

   // destination: function(req, file, cb){
    //   cb(null,'./uploads/');
  //},
   filename: function(req, file, cb)  {
    cb(null, new Date().toISOString() + file.originalname);
}
});

// setting to accept files with extension jpeg/png only 
const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};


//upload varibale to define localstorage of file 

const upload = multer({
    dest:'./uploads/',
    //storage:storage,
    limits:{fileSize:1024 * 1024 * 5},      //size limit-less than 5MB   
    fileFilter:fileFilter
});  



//Routes
/*
router.post('/save', upload.single('profileImg'),(req,res)=>{
    console.log(req.file);
    let newPost = new Profile(req.body);
    
    newPost.save((err)=>{
        
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(201).json({
            success:"Posts saved successfully"
            
        }); 
    });

});
*/
router.post("/save", upload.single('Evidence'),(req, res, next) => {
    console.log(req.file);
    const report = new Report({
      
        _id: new mongoose.Types.ObjectId(),
       NIC: req.body.NIC,
       ContactNo:req.body.ContactNo,
       WasteType:req.body.WasteType,
       Evidence: req.file.path 
    });
    report
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created profile successfully",
          createdProfile:result
        })

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
/*
    const id = req.params.id;  // extract id value 
    

    res.status(201).json({
        message:id,
        success:"successfully displyed custom data"
    }) */

    const id = req.params.id;

    Report.findById(id)
    .exec()
    .then(data =>{
        console.log("from database",data.id); //display single data element

        res.status(200).json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
    
});


//retreive all profile details

router.get("/", (req, res, next) => {
    Report.find()
      .select("NIC ContactNo WasteType Evidence")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              _id: doc._id,  
              NIC: doc.NIC,
              ContactNo:doc.ContactNo,
              WasteType:doc.WasteType,
              Evidence:doc.Evidence
              
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
       
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });



//update by id
router.put('/update/:id',checkAuth,(req,res)=>{

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