import { Iuser, UserRole } from "../types/interfaces/user.inter";
import User from "../models/user.model";
import crypto from "crypto";


export default class ProfileService {
  static async getProfile(userId: string): Promise<Partial<Iuser> | null> {
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return null;
    }
    return userProfile;
  }

    static async setProfile(
    userId: string,
    payload: Iuser
  ): Promise<Iuser | null> {
    const { walletHash } = payload;

    const profile = await User.findByIdAndUpdate(
      userId,
      { walletHash },
      { new: true }
    )
    return profile;
  }

  static async searchByMatric(matNumber: string) {
    return await User.findOne({ matNumber });
  }

    static async getPharmacists(): Promise<Partial<Iuser>[]> {
    const userProfile = await User.find({role: UserRole.PHARMACIST});
    return userProfile;
  }

      static async getNurses(): Promise<Partial<Iuser>[]> {
    const userProfile = await User.find({role: UserRole.NURSE});
    return userProfile;
  }

  static async generateAccessCode(userId: string): Promise<string | null> {
    const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase() +
      crypto.randomBytes(2).toString('hex').toUpperCase();

    const user = await User.findByIdAndUpdate(
      userId,
      { accessCode },
      { new: true }
    );

    return user ? user.accessCode : null;
  }

  static async findUserByAccessCode(code: string): Promise<{ fullName: string } | null> {
    const user = await User.findOne({ accessCode: code });
    return user ? { fullName: user.fullName } : null;
  }
}
