import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {StatusCode} from '../types/statusCode.js'
import { Request,Response } from "express";
import Exam from '../models/exam.model.js'
import { IExam } from "../types/modelInterface.js";

export const addNewExam=asyncHandler(async(req:Request,res:Response)=>{
    const {examName,examClass,examStatus,examTerm,examDateRange,academicYear,sections}=req.body;

    if(!examName || !examClass || !examStatus || !examTerm || !examDateRange || !academicYear || !sections) throw new ApiError(StatusCode.BadRequest,"please provide all details");

    const newExam=await Exam.create({
        examName,examClass,examStatus,examTerm,examDateRange,academicYear,sections
    })

    if(!newExam) throw new ApiError(StatusCode.InternalServerError,"request fail please try again")

    res.status(StatusCode.Created).json(new ApiResponse(StatusCode.Created,"Exam created",newExam));
})

