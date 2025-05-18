import mongoose, { Document, Schema } from "mongoose";

export interface IPrescription extends Document {
  _user: Schema.Types.ObjectId | string;
  createdAt: Date;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: Schema.Types.ObjectId | string;
  assignedTo?: Schema.Types.ObjectId | string;
  markedAsGiven?: boolean
  givenBy?: Schema.Types.ObjectId | string;
  prescribedBy: string;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
}
