import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {StatusCode} from '../types/statusCode.js'
import { Request,Response } from "express";
import StudentMarks from '../models/studentMarks.model.js'

const marksFilter=asyncHandler(async(req:Request,res:Response)=>{
    const {examclass,section,examType}=req.query;

    const matchFilter: any = {};
    if (examclass) matchFilter["studentInfo.class"] = examclass;
    if (section) matchFilter["studentInfo.section"] = section;

    
    const examMatch: any = {};
    if (examType) examMatch["examInfo.examName"] = examType;

    const students=await StudentMarks.aggregate([
        {
            $lookup:{
                from:"students",
                localField:"studentId",
                foreignField:"_id",
                as:"studentInfo"
            }
        },
        {
            $unwind:"$studentInfo"
        },
        ...(Object.keys(matchFilter).length ? [{ $match: matchFilter }] : []),
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
       ...(Object.keys(examMatch).length ? [{ $match: examMatch }] : []),
        {
            $project:{
                "examInfo":0,
                name:"$studentInfo.name",
                class:"$studentInfo.class",
                section:"$studentInfo.section",
                marks:"$totalMarks"
            }
        }
    ])
})