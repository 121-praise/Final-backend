import { Iuser } from "../types/interfaces/user.inter";
import User from "../models/user.model";

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

}
