import  express  from 'express';
import {AddDonate, getAllDonate, getOneDonate, updateDonate, deleteDonate } from '../controllers/Donate.js'
const router = express.Router();




router.post('/add', AddDonate);
router.delete('/delete/:donate_id',deleteDonate);
router.get("/getall", getAllDonate);
router.get("/get/:donate_id", getOneDonate);
router.put("/update/:id", updateDonate);

export default router;