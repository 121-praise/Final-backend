import User from '../models/user.model';
import { Iuser } from '../types/interfaces/user.inter';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import sendEmail from '../utils/sendEmail';
const otpGenerator = require('otp-generator');

export default class AuthService {


  static async createSendToken(user: Iuser, statusCode: number, res: Response): Promise<void> {
    const token = this.signToken(user._id as string);

    const expiresIn = process.env.JWT_COOKIE_EXPIRES_IN 
      ? Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000 
      : null;

    const cookieOptions: { [key: string]: any } = {
      expiresIn: expiresIn ? new Date(Date.now() + expiresIn) : undefined,
      httpOnly: true,
    };

    // Ensure the cookie is secure in production
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // Send response with cookie and user data
    res.status(statusCode).cookie('jwt', token, cookieOptions).json({
      success: true,
      token,
      data: {
        user,
      },
    });
  }



  static async findUserById(userId: string): Promise<Iuser | null> {
    return User.findById(userId)
  }

  static async findUserByHash(walletHash: string): Promise<Iuser | null> {
    return User.findOne({ walletHash })
  }


  static async findUserByMatNumber(matNumber: string): Promise<Iuser | null> {
    return User.findOne({ matNumber })
  }

  static async findUserByEmail(email: string): Promise<Iuser | null> {
    const data = await User.findOne({ email })

    return data;
  }

  static signToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY || 'mysecret', {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }


  static async deleteUserById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }

  
  static async createUser(userData: Partial<Iuser>): Promise<Iuser> {
    const newUser = await User.create({
      ...userData,
    });

    // await this.sendWelcomeEmail(newUser, otp);
    return newUser;
  }


}

