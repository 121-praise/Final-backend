import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { Iuser, UserRole } from '../types/interfaces/user.inter';
import ResponseHelper from '../utils/response';
import AuthService from '../services/auth.service';


declare global {
  namespace Express {
    interface Request {
      user: Iuser;
    }
  }
}


  
/**
 * @author 
 * @description Signup patient
 * @route `/api/v1/auth/signup-individual`
 * @access Public
 * @type POST
 */
export const signupPatient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let newUser: Iuser | null = null; 
  
  try {
    const userMat = await AuthService.findUserByMatNumber(req.body.matNumber);

    if (userMat) {
      return next(new AppError("User with this Matric Number already exists", ResponseHelper.RESOURCE_NOT_FOUND));
    }

    const { 
      fullName, 
      matNumber,
      regDate,
      hostelRoomNumber

    } = req.body;
    

    newUser = await AuthService.createUser({
      fullName, 
      matNumber,
      regDate,
      hostelRoomNumber,
      role: UserRole.PATIENT
    });

    await AuthService.createSendToken(newUser, 201, res);
    
  } catch (err) {

    
    if (newUser) {
      await AuthService.deleteUserById(newUser._id as string);
    }
    console.log("error", err);
    return next(new AppError("Couldn't create the user. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
  }
});

/**
 * @author 
 * @description Signup staff
 * @route `/api/v1/auth/signup-individual`
 * @access Public
 * @type POST
 */
export const signupStaff = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let newUser: Iuser | null = null; 
  
  try {

    const { 
      fullName, 
      role,

    } = req.body;
    

    newUser = await AuthService.createUser({
      fullName, 
      role,
    });

    await AuthService.createSendToken(newUser, 201, res);
    
  } catch (err) {

    if (newUser) {
      await AuthService.deleteUserById(newUser._id as string);
    }
    console.log("error", err);
    return next(new AppError("Couldn't create the user. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
  }
});

/**
 * @author 
 * @description Login user controller
 * @route `/api/v1/auth/login`
 * @access Public
 * @type POST
 */
export const connectLogin = catchAsync(async(req: Request, res: Response, next: NextFunction) => {


  const user = await AuthService.findUserByHash(req.body.hash)

  if (!user) {
      return next(new AppError("User does not exist", ResponseHelper.RESOURCE_NOT_FOUND))
  }

  await AuthService.createSendToken(user, 201, res);
})