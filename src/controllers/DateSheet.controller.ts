import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {StatusCode} from '../types/statusCode.js'
import { Request,Response } from "express";
import DateSheet from "../models/dateSheet.model.js";
import Exam from '../models/exam.model.js'
import mongoose from "mongoose";
import Student from "../models/student.mode.js";

export const searchDateSheet=asyncHandler(async(req:Request,res:Response)=>{
     const {academicYear,examName}=req.params;

    if(!academicYear || !examName) throw new ApiError(StatusCode.BadRequest,"please provide all valid field");

    const dateSheet=await DateSheet.aggregate([
        {
            $match:{
                academicYear:academicYear,
                examName:examName
            }
        },
        {
            $project:{
                academicYear:1,
                examName:1,
                examClass:1,
                subjectCount:{$size:"$datesheet"},
                createdAt:1
            }
        }
    ])
    
    
    if(!dateSheet) throw new ApiError(StatusCode.NotFound,"date sheet not found");

    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"datesheet fetched",dateSheet));
})

export const deleteDatesheet=asyncHandler(async(req:Request,res:Response)=>{
      const datesheetId:string=req.params.datesheetId as string;

      if(!datesheetId) throw new ApiError(StatusCode.BadRequest,"please provide the id");

      await DateSheet.deleteOne({
        _id:new mongoose.Types.ObjectId(datesheetId)
      })

      res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"Date sheet deleted successfully"));
})

export const editDateSheet=asyncHandler(async(req:Request,res:Response)=>{
      const {academicYear,examName,examClass,datesheet}=req.body;
      const datesheetId:string=req.params.datesheetId as string
      
      if(!datesheetId || !academicYear || !examName || !examClass || !datesheet) throw new ApiError(StatusCode.BadRequest,"please provide all fields");

      const Updatedatesheet=await DateSheet.findByIdAndUpdate(
              new mongoose.Types.ObjectId(datesheetId),
              {
              academicYear,examName,examClass,datesheet
      })

      if(!Updatedatesheet) throw new ApiError(StatusCode.InternalServerError,"something went wrong");

      res.status(200).json(new ApiResponse(StatusCode.OK,"update succesffuly",Updatedatesheet));
})

export const createDateSheet=asyncHandler(async(req:Request,res:Response)=>{
    const {academicYear,examName,examClass,datesheet}=req.body;

    // first checking the exam for this datesheet,exist or not
    const exam=await Exam.findOne({
        examName,
        examClass,
        academicYear
    })

    if(!exam) throw new ApiError(StatusCode.InternalServerError,"please try again or check if the exam exist for this datesheet");
    const newdatesheet=await DateSheet.create({
        academicYear,
        examName,
        examClass,
        datesheet
    })
    
    if(!newdatesheet) throw new ApiError(StatusCode.InternalServerError,"something went wrong, please try again");
    exam.datesheetId=newdatesheet._id
    await exam.save({validateBeforeSave:false})
    res.status(StatusCode.Created).json(new ApiResponse(StatusCode.Created,"new datesheet created",newdatesheet));
})