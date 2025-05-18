import Prescription from '../models/prescription.model';
import  { IPrescription } from '../types/interfaces/prescription.inter'

export default class prescriptionService {
  static async getAll() {

    const data  = await Prescription.find();

    return data
  }

  static async getOne(id: string) {
    const prescription = await Prescription.findById(id);
    if (!prescription) throw new Error("Prescription not found");
    return prescription;
  }

  static async createPrescription(userId: string, data: Partial<IPrescription>) {

    const newPrescription = await Prescription.create({
        ...data,
        user: userId,
    });

      return newPrescription;

  }

  static async markPrescription(id: string, userId: string) {

    const prescription = await Prescription.findById(id);
    
    if (!prescription) throw new Error("Prescription not found");

    prescription.markedAsGiven = true;
    prescription.givenBy = userId;
    await prescription.save();

    return prescription;
  }

  static async assignToPatient(prescriptionId: string, patientId: string) {
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) throw new Error("Prescription not found");

    prescription._user = patientId;
    await prescription.save();

    return prescription;
  }
}
