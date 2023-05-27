import  express  from 'express';
import {AddVolunteer, getAllVolunteer, getOneValounteer, updateVolunteer, deleteVolunteer } from '../controllers/Volunteer.js'  //import controller methods to the routes
const router = express.Router();




router.post('/add', AddVolunteer);   //controller eke methods tikata path eka hadanawa
router.delete('/delete/:volunteer_id',deleteVolunteer);
router.get("/getall", getAllVolunteer);
router.get("/get/:volunteer_id", getOneValounteer);
router.put("/update/:id", updateVolunteer);

export default router;  