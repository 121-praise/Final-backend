import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import ResponseHelper from "../utils/response";
import ProfileService from "../services/profile.service";

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get profile
 * @route `/api/v1/profile/get-profile`
 * @access Private
 * @type GET
 **/
export const getProfile = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  try {
      const profile = await ProfileService.getProfile(req.user?.id)

      if(!profile ) {
          return next(new AppError("No profile found", ResponseHelper.RESOURCE_NOT_FOUND))
      }

      ResponseHelper.sendSuccessResponse(res, { 
          statusCode: ResponseHelper.OK,
          data: profile ,  
      });

  } catch (error) {
    console.log(error)
    return next(new AppError("An error occurred while trying to get your profile. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})

/**
 * @author
 * @description Update profile
 * @route `/api/v1/profile/update-profile`
 * @access Private
 * @type PATCH
 **/
export const setProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const profile = await ProfileService.setProfile(req.user?.id, req.body)

    if(!profile){
      return next(new AppError("User not found", ResponseHelper.RESOURCE_NOT_FOUND))
    }
  
    // send success response
    ResponseHelper.sendSuccessResponse(res, {
        message: 'Profile set successfully',
        statusCode: ResponseHelper.OK,
        data: profile,
    });

  } catch (error) {
    return next(new AppError("An error occurred while trying to set your profile. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})

/**
 * @author
 * @description Search by matric number
 * @route `/api/v1/profile/search-by-matric`
 * @access Private
 * @type GET
 **/
export const searchByMatric = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { matNumber } = req.query;

    if (!matNumber || typeof matNumber !== 'string') {
      return next(new AppError('Matric number is required', ResponseHelper.BAD_REQUEST));
    }

    const data = await ProfileService.searchByMatric(matNumber);

    if (!data) {
      return next(new AppError('User not found with the given matric number', ResponseHelper.RESOURCE_NOT_FOUND));
    }

    return ResponseHelper.sendSuccessResponse(res, {
      message: 'User retrieved successfully',
      statusCode: ResponseHelper.OK,
      data,
    });

  } catch (error) {
    return next(new AppError("An error occurred while trying to search by mat number. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
  }
});

/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get pharmacists
 * @route `/api/v1/profile/get-pharmacists`
 * @access Private
 * @type GET
 **/
export const getPharmacists = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  try {
      const profile = await ProfileService.getPharmacists()

      if(!profile ) {
          return next(new AppError("No profile found", ResponseHelper.RESOURCE_NOT_FOUND))
      }

      ResponseHelper.sendSuccessResponse(res, { 
          statusCode: ResponseHelper.OK,
          data: profile ,  
      });

  } catch (error) {
    console.log(error)
    return next(new AppError("An error occurred while trying to get your profile. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get nurses
 * @route `/api/v1/profile/get-nurses`
 * @access Private
 * @type GET
 **/
export const getNurses = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  try {
      const profile = await ProfileService.getNurses()

      if(!profile ) {
          return next(new AppError("No profile found", ResponseHelper.RESOURCE_NOT_FOUND))
      }

      ResponseHelper.sendSuccessResponse(res, { 
          statusCode: ResponseHelper.OK,
          data: profile ,  
      });

  } catch (error) {
    console.log(error)
    return next(new AppError("An error occurred while trying to get your profile. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})
