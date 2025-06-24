import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {StatusCode} from '../types/statusCode.js'
import { Request,Response } from "express";
import StudentMarks from '../models/studentMarks.model.js'
import mongoose from "mongoose";

export const marksFilter=asyncHandler(async(req:Request,res:Response)=>{
    const {examclass,section,examName}=req.query;

    const matchFilter:any={};
    if (examclass) matchFilter["studentInfo.class"] = examclass;
    if (section) matchFilter["studentInfo.section"] = section;

    
    const examMatch:any={};
    if (examName) examMatch["examInfo.examName"] = examName;

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
                studentId:1,
                examId:1,
                name:"$studentInfo.name",
                class:"$studentInfo.class",
                section:"$studentInfo.section",
                cumaltiveMarks:"$totalMarks",
                maximumMarks:{$sum: {
                    $map: {
                        input: { $objectToArray: "$maximumMarks" },
                        as: "m",
                        in: "$$m.v"
                    }
                }}
            }
        }
    ])
    
    if(!students) throw new ApiError(StatusCode.InternalServerError,"something went wrong");

    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"filter data",students))
})

// view details of student when click on filter data
export const viewDetails=asyncHandler(async(req:Request,res:Response)=>{
    const studentId:string=req.query.studentId as string;
    const {examName,examClass}=req.body;

    if(!studentId) throw new ApiError(StatusCode.BadRequest,"please give a valid request");

    const details=await StudentMarks.aggregate([
        {
            $match:{
              studentId:new mongoose.Types.ObjectId(studentId)
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
                "examInfo.examName":examName,
                "examInfo.examClass":examClass
            }
        },
        {
            $project:{
                examId:1,
                examName:"$examInfo.examName",
                totalScore:"$totalMarks",
                subjectMarks:"$marks",
                maximumMarks:"$maximumMarks"
            }
        }
    ]);


    const average=await StudentMarks.aggregate([
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
                "examInfo.examName":examName,
                "examInfo.examClass":examClass
            }
        },
        {
            // convert the marks Map to array of { k:subject, v:mark }
            $project: {
            marksArray: {
                $objectToArray: { $ifNull: ["$marks", {}] }
            }
            }
        },
        {
            $unwind: "$marksArray"
        },
        {
            $group: {
            _id: "$marksArray.k", // subject name
             avgMarks:{$avg:"$marksArray.v"}
            }
        },
        {
            $group: {
            _id: null,
            subjects: {
                $push: { subject: "$_id", avgMarks: "$avgMarks" }
            },
            overallAverage: { $avg: "$totalMarks" }
            }
        }
    ])


    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all details are fetched",{details,average}))
})