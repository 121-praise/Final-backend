import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import ResponseHelper from '../utils/response';
import prescriptionService from '../services/prescription.service';

// Get all prescriptions
export const getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

  const data = await prescriptionService.getAll();
  
    // send success response
    ResponseHelper.sendSuccessResponse(res, {
    message: 'Prescriptions retrieved successfully',
        statusCode: ResponseHelper.OK,
        data: data,
    });

  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})

export const getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

  const data = await prescriptionService.getOne(req.params.id);
  
    // send success response
    ResponseHelper.sendSuccessResponse(res, {
    message: 'Prescription retrieved successfully',
        statusCode: ResponseHelper.OK,
        data: data,
    });

  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})


// Create prescription (Doctor only)
export const createPrescription = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

  const data = await prescriptionService.createPrescription(req.user?.id, req.body);
  
    // send success response
    ResponseHelper.sendSuccessResponse(res, {
    message: 'Prescription created successfully',
        statusCode: ResponseHelper.RESOURCE_CREATED,
        data: data,
    });

  } catch (error) {
    console.log(error)
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})

// Mark prescription as given
export const markPrescription = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

  const data = await prescriptionService.markPrescription(req.params.id, req.user?.id);
  
    // send success response
    ResponseHelper.sendSuccessResponse(res, {
    message: 'Prescription marked as given',
    statusCode: ResponseHelper.OK,
        data: data,
    });

  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})

// Assign prescription to a patient
export const assignToPatient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

  const { prescriptionId, patientId } = req.body;

  const data = await prescriptionService.assignToPatient(prescriptionId, patientId);
  
    // send success response
    ResponseHelper.sendSuccessResponse(res, {
    message: 'Prescription assigned to patient',
    statusCode: ResponseHelper.OK,
        data: data,
    });

  } catch (error) {
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
  }
})

