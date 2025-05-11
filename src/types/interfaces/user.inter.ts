import mongoose, { Document, Schema } from "mongoose";

export enum UserRole{
    DOCTOR = "Doctor",
    NURSE = "Nurse",
    PHARMACIST = "Pharmacist",
    PATIENT = "Patient",
}

export interface Iuser extends Document{
    fullName: string;
    matNumber: string;
    regDate: Date;
    hostelRoomNumber: string;
    walletHash: string;
    role: UserRole,
    verificationToken: string;
    verificationTokenExpires: Date;
    resetPasswordToken: number;
    resetPasswordExpire: Date;
    verifyEmailToken: string;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    generateAuthToken(): string;
    changedPasswordAfter(JWTTimestamp: any): boolean;
    createdAt: Date;
}
