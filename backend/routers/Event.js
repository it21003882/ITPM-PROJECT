import  express  from 'express';
import {AddEvent, getAllEvent, getOneEvent, updateEvent, deleteEvent } from '../controllers/Event.js'
import multer from 'multer';
import path from 'path';
const router = express.Router();



const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'Event_Photos')
    },
    filename: function(req, file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage});



router.post('/add',upload.single('image'), AddEvent);
router.delete('/delete/:event_id',deleteEvent);
router.get("/getall", getAllEvent);
router.get("/get/:event_id", getOneEvent);
router.put("/update/:id",upload.single('image'), updateEvent);

export default router;