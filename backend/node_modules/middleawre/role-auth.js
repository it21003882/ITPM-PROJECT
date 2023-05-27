const Profile=require('../models/profile')

const authEmp = (permission) => {
    return(req,res,next) => {
        const userPost=Profile.find()
        .select("post")
        .exec()
        .then(docs => {
            const response = {
              count: docs.length,
              products: docs.map(doc => {
                return {
                  post: doc.post
                };
              })
            };
            console.log(response);
            if( userPost !== permission)
            {               
                return res.status(401).json('not allowed')    
            }else{
                next();
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      };

    }

const authNum = (req,res,next) => {
    
    const post =req.params.post;
    profilePost= Profile.find()
    .select("post")
    .exec()
    .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              post: doc.post,
            
            };
          })
        };
        console.log(response);
        if( post === profilePost)
        {            
            next();   
                
        }else{
            res.status(401).json('not allowed')
        }
        
        
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };



    


module.exports={authEmp,authNum};