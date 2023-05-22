import certificate from '../moduls/E-Certificate.js'


export const addCertificate = async (req, res) => {
  // console.log(req.body)
 try{
 
      const prefix = 'ECID'
      const E_CertificateID = (prefix + Date.now())
      // console.log(POST_ID)

      const newCerti = new certificate({
        certificate_id: E_CertificateID,
        full_name: req.body.full_name,
        event_name: req.body.event_name,
        email_address: req.body.email_address
      });

      const newC = await newCerti.save();
      console.log(newC);
      if (newC) {
      
        res.status(201).json({
          message: "New Volunteer Created Sucessfull..!",
          payload: newC
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

export const getOneCertificate = async (req, res) => {
  try {
    let id = req.params.certificate_id;
    const Certi = await certificate.findById(id);
    if (Certi) {
      res.status(200).json({ Certi });
    } else {
      res.status(404).json({ message: "No posts found for user ID " + id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
