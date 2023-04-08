const express = require('express');
const router = express.Router();
const Location =require('../models/map');


router.get("/",(req,res,next) => {
  
  Location.find()
  .exec()
  .then( data => {
  return res.status(200).json({
    success:true,
    count:data.length,
    data:data
  });
})

.catch(err => {
  console.log(err);
  res.status(500).json({
    error: err
  });
});

});


router.post("/save",async(req,res,next) => {
  const place = new Location({  
    Pid:req.body.Pid,
    Address:req.body.Address
});
console.log(req.body.Pid);


//res.status(200).json(await place.save())
place.save()
.then( data => {
  console.log(data.Pid + '' + place );
  res.status(200).json({
    success:true,
    mdata:data
  })
}).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

});

/*
const location = new Location({
    name: 'My Location',
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  });*/
  
  /*
  location.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Location saved successfully!');
    }
  });
  */
/*
  router.post("/save",(req, res, next) => {
    console.log(req.file);
    
    const location = new Location({
      
      name: 'My Location',
      location: {
        type: 'Point',
        coordinates: [parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
      }

    });
    location
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created geo location successfully",
          geoLocation:result
        })

      })

      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  */





module.exports = router;