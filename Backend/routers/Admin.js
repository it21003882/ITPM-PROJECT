import  express  from 'express';
import {AdminRegister, Signin, Signout, tokenRefresh } from '../controllers/Admin.js'
const router = express.Router();



router.post('/Signup', AdminRegister);
router.post('/Signin',Signin);
router.delete('/Signout',Signout);
router.post('/Token',tokenRefresh);

export default router;