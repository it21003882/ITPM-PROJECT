import express from 'express';
const router = express.Router();



import {createReport,getSingleForm,GetAllForms,UpdateReport,DeleteReport} from '../controllers/Form.js'

/*
//// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Create Multer instance
const upload = multer({ storage: storage });

// Serve uploaded images statically
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
*/







//Routes
router.post("/save",createReport);
router.get('/:id',getSingleForm);
router.get('/',GetAllForms);
router.put('/update/:id',UpdateReport);
router.delete('/delete/:id',DeleteReport);












export default router;