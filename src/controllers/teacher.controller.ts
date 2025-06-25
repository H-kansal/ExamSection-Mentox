import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {StatusCode} from '../types/statusCode.js'
import { Request,Response } from "express";
import Teacher from '../models/teacher.mode.js'
import MarksAssign from '../models/marksAssign.model.js'
import mongoose from "mongoose";

export const showExam=asyncHandler(async(req:Request,res:Response)=>{
    const teacherId:string = req.user?.teacherId as string;
    const {category}=req.query;

     if(!teacherId) throw new ApiError(StatusCode.BadRequest,"bad request");
     
     if(category==="all exam"){
         const allPapers=await MarksAssign.find({
            teacherId:new mongoose.Types.ObjectId(teacherId)
         }).populate({
            path:'examId'
         })
         
         if(!allPapers) throw new ApiError(StatusCode.InternalServerError,"something went wrong");
     
         res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all assigned papers",allPapers));
     }

     else{

        const inprogressPapers=await MarksAssign.aggregate([
           {
              $match:{
                 teacherId:new mongoose.Types.ObjectId(teacherId)
               }
            },
            {
               $lookup:{
                  from:"exams",
                  localField:"examId",
                  foreignField:"_id",
                  as:"examInfo"
               }
            },
            {
               $unwind:"$examInfo"
            },
            {
               $match:{
                  "examInfo.examStatus":category
               }
            }
         ])
         
         if(!inprogressPapers) throw new ApiError(StatusCode.InternalServerError,"pleasse try again");
         
         res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"your progress exams",inprogressPapers));
      }
})