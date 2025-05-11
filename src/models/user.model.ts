import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Iuser } from "../types/interfaces/user.inter";
import { UserRole } from "../types/interfaces/user.inter";

const userSchema = new Schema<Iuser>({
	fullName: {
		type: String,
	},
    matNumber: {
		type: String,
	},
    regDate: {
		type: Date,
	},
	hostelRoomNumber: {
		type: String,
	},
	walletHash: {
		type: String,
	},
	role:{
		type: String,
		enum: UserRole
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	verifyEmailToken: {
		type: String,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});

  
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY || '', {
      expiresIn: process.env.JWT_EXPIRES_IN || '',
    });
    return token;
};

userSchema.methods.correctPassword = async function(
    candidatePassword: string,
    userPassword: string
){
    return await bcrypt.compare(candidatePassword, userPassword)
}



userSchema.methods.changedPasswordAfter = function (JWTTimestamp: any) {
    if (this.passwordChangedAt) {
      const changedTimestamp = String(
        this.passwordChangedAt.getTime() / 1000
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
};



const User = mongoose.model<Iuser>('User', userSchema)

export default User;