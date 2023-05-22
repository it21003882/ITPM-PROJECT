import jwt from 'jsonwebtoken'
let refreshtokens = [];
import User from '../moduls/User.js';


export const UserRegister = async (req, res) => {
  console.log(req.body)
 try{
  
  console.log(req.body.email)
    const ExsistUser = await User.findOne({ email: req.body.email });
    console.log(ExsistUser)
    if (ExsistUser) {

      res.status(404).json({
        message: "User Already registered..!",

      })
    } else if(!ExsistUser) {
      const prefix = 'UID'
      const USER_ID = (prefix + Date.now())
      console.log(USER_ID)
      const newUser = new User({
        user_id: USER_ID,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
        address: req.body.address,
        gender: req.body.gender,
        image: req.body.image,
      });

      console.log(newUser);
      const newAcct = await newUser.save();
      console.log(newAcct)
      if (newAcct) {
        console.log('1')
        res.status(201).json({
          message: "Registration Sucessfull..!",
          payload: newAcct
        })
      } else {
        console.log('2')
        res.status(400).json({
          message: "Somthing Went Wrong In Account Creating..!"
        })
      }


    }
  } catch (error) {
    console.log('3')
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error
    })



  }
}

export const Signin = async (req, res) => {       
  try {
    
    /*console.log(req.body.email)*/
    const RegisterdUser = await User.findOne({ email: req.body.email });  //walin login credentials harida balnwa
   // console.log(RegisterdUser)  
    if (RegisterdUser) {
      const enterdPwd = req.body.password;
      const dbPwd = RegisterdUser.password;
      const uid = RegisterdUser._id;
      //console.log(enterdPwd,dbPwd);
      console.log(uid);
      if (enterdPwd === dbPwd) {                  //methana idan JWT token use krnwa
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h'});
        const refreshToken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '24h' });
        // console.log("token  "+token)
        // console.log("refresh token    "+refreshToken)
        refreshtokens.push(refreshToken);
        res.status(201).json({
          mesage: "Login Successfull..!",
          token,
          refreshToken,
          payload:{uid}
        })
      } else {
        res.status(401).json({
          message: "Incorrect Password..!"
        })
      }
    } else {
      res.status(404).json({
        message: "User Not Registered..!"
      })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server error..!",
      error: error
    })
  }
}

export const tokenRefresh = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) {
    res.status(401).json({
      message: "Unauthorized..!"
    })
  } else if (!refreshtokens.includes(refreshToken)) {
    res.status(403).json({
      message: "Forbidden..!"
    })
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
      if (err) {
        res.status(403).json({
          message: "Forbidden..!"
        })
      } else {
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: "1h" });
        res.status(201).json({
          message: "Session Extended..!",
          token
        })
      }
    })
  }
}

export const Signout = (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    refreshtokens = refreshtokens.filter(token => token !== refreshToken);
    res.status(200).json({
      message: "Signout successful!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find();
    if (allusers) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: allusers
      })
    }
  }catch(error){
    console.log(error)
  }
}

export const getOneUser = async (req, res) => {
  try {
    let userId = req.params.user_id;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({user
      })
    }
  }catch(error){
    console.log(error)
  }
}

