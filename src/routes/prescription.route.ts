import express from "express";
import { 
    getAll, 
    getOne,
    createPrescription,
    markPrescription,
    assignToPatient
} from "../controllers/prescription.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const PrescriptionRouter = express.Router()

PrescriptionRouter.use(MiddlewareService.protect)

PrescriptionRouter.get('/get-all', getAll)

PrescriptionRouter.get('/get-one/:id', getOne);

PrescriptionRouter.post('/create-prescription', createPrescription);

PrescriptionRouter.patch('/mark/:id', markPrescription);


PrescriptionRouter.post('/assign', assignToPatient);


export default PrescriptionRouter;