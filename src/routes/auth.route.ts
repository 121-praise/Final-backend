import express from 'express';
import { 
    signupPatient,
    signupStaff,
    connectLogin

} from '../controllers/auth.controller'

const router = express.Router();

router.post('/patient', signupPatient)

router.post('/staff', signupStaff)

router.post('/login', connectLogin)


export default router;