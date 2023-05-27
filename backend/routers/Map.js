import {createMap,getSingleMap,GetAllMap,DeleteMarker}  from '../controllers/Map.js'
import  express  from 'express';
const router = express.Router();



import path from 'path';

//const router=express();

// Serve uploaded images statically
//router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Routes

router.post("/save",createMap);
router.get("/",getSingleMap);
router.get("/:id",GetAllMap);
router.delete("/delete/:id",DeleteMarker);







export default router;