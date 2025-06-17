import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import {StatusCode} from '../types/statusCode'
import { Request,Response } from "express";
import Exam from '../models/exam.model'
import { IExam } from "../types/modelInterface";

export const addNewExam=asyncHandler(async(req:Request,res:Response)=>{
    const {examName,examClass,examStatus,examTerm,examDateRange,academicTerm}=req.body;

    if(!examName || !examClass || !examStatus || !examTerm || !examDateRange || !academicTerm) throw new ApiError(StatusCode.BadRequest,"please provide all details");

    const newExam=await Exam.create({
        examName,examClass,examStatus,examTerm,examDateRange,academicTerm
    })

    if(!newExam) throw new ApiError(StatusCode.InternalServerError,"request fail please try again")

    res.status(StatusCode.Created).json(new ApiResponse(StatusCode.Created,"Exam created",newExam));
})