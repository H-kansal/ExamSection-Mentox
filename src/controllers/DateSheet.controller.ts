import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import {StatusCode} from '../types/statusCode'
import { Request,Response } from "express";
import DateSheet from "../models/dateSheet.model";
import Exam from '../models/exam.model'

export const searchDateSheet=asyncHandler(async(req:Request,res:Response)=>{
     const {academicYear,examName}=req.body;

    if(!academicYear || !examName) throw new ApiError(StatusCode.BadRequest,"please provide all valid field");

    const dateSheet=await Exam.find({
        examName,
        academicYear
    }).populate({
        path:'datesheetId',
        select:'datesheet'
    })
    
    
    if(!dateSheet) throw new ApiError(StatusCode.NotFound,"date sheet not found");

    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"datesheet fetched",dateSheet));
})

export const deleteDatesheet=asyncHandler(async(req:Request,res:Response)=>{
      const {datesheetId}=req.query;

      if(!datesheetId) throw new ApiError(StatusCode.BadRequest,"please provide the id");

      await DateSheet.deleteOne({
        _id:datesheetId
      })

      res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"Date sheet deleted successfully"));
})

export const editDateSheet=asyncHandler(async(req:Request,res:Response)=>{
      const {datesheetId,academicTerm,examName,examClass,datesheet}=req.body;

      if(!datesheetId || !academicTerm || !examName || !examClass || !datesheet) throw new ApiError(StatusCode.BadRequest,"please provide all fields");

      const Updatedatesheet=await DateSheet.findByIdAndUpdate(datesheetId,{
              academicTerm,examName,examClass,datesheet
      })

      if(!Updatedatesheet) throw new ApiError(StatusCode.InternalServerError,"something went wrong");

      res.status(200).json(new ApiResponse(StatusCode.OK,"update succesffuly",Updatedatesheet));
})