import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import {StatusCode} from '../types/statusCode'
import { Request,Response } from "express";
import Teacher from '../models/teacher.mode'
import ExamPaper from '../models/examPaper.model'
import mongoose from "mongoose";

export const showAllExam=asyncHandler(async(req:Request,res:Response)=>{
     const teacherId:string = req.query.teacherId as string;
     
     if(!teacherId) throw new ApiError(StatusCode.BadRequest,"bad request");
     
     const allPapers=await ExamPaper.find({
        teacherId:new mongoose.Types.ObjectId(teacherId)
     }).populate({
        path:'examId'
     })
     
     if(!allPapers) throw new ApiError(StatusCode.InternalServerError,"something went wrong");
     
     res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all assigned papers",allPapers));
})

