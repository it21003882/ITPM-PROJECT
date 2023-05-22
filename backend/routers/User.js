import  express  from 'express';
import {UserRegister, Signin, Signout, tokenRefresh, getAllUsers,getOneUser } from '../controllers/User.js'
const router = express.Router();



router.post('/Signup', UserRegister);
router.post('/Signin',Signin);
router.delete('/Signout',Signout);
router.post('/Token',tokenRefresh);
router.get("/allusers", getAllUsers);
router.get("/user/:user_id", getOneUser);

export default router;