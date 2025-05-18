import mongoose, { Document, Schema } from "mongoose";
import { IPrescription } from "../types/interfaces/prescription.inter";

const PrescriptionSchema = new Schema<IPrescription>(
  {
    _user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
    },
    medicationName: { 
        type: String, 
    },
    dosage: { 
        type: String, 
    },
    frequency: { 
        type: String, 
    }, 
    duration: { 
        type: String, 
    },
    instructions: { 
        type: String
    },
    prescribedBy: { 
        type: String, 
    },
    assignedTo: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    markedAsGiven: { 
        type: Boolean, 
        default: false 
    },
    givenBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    startDate: { 
        type: Date 
    },
    endDate: { 
        type: Date 
    },
    notes: { 
        type: String 
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Prescription = mongoose.model<IPrescription>('Prescription', PrescriptionSchema)

export default Prescription;