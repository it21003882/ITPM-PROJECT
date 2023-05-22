import  express  from 'express';
import {AddVolunteer, getAllVolunteer, getOneValounteer, updateVolunteer, deleteVolunteer } from '../controllers/Volunteer.js'
const router = express.Router();




router.post('/add', AddVolunteer);
router.delete('/delete/:volunteer_id',deleteVolunteer);
router.get("/getall", getAllVolunteer);
router.get("/get/:volunteer_id", getOneValounteer);
router.put("/update/:id", updateVolunteer);

export default router;