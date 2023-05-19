import  express  from 'express';
import { addCertificate, getOneCertificate} from '../controllers/E-Certificate.js'
const router = express.Router();



router.post('/add', addCertificate);
router.get("/get/:certificate_id", getOneCertificate);

export default router;