import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {StatusCode} from '../types/statusCode.js'
import { Request,Response } from "express";
import Exam from "../models/exam.model.js";
import StudentMarks from "../models/studentMarks.model.js";

export const examAnalytics=asyncHandler(async(req:Request,res:Response)=>{
     const {academicYear,examClass,examName}=req.body;

     if(!academicYear || !examClass || ! examName) throw new ApiError(StatusCode.BadRequest,"please provide all details");

     const exam=await Exam.find({
        examName,
        examClass,
        academicYear
     })
    
     if(!exam) throw new ApiError(StatusCode.InternalServerError,"something went wrong please try again");

     if(exam.length==0) res.status(StatusCode.NotFound).json(new ApiResponse(StatusCode.NotFound,"no such exam exist",exam));
 
    const examAnalytics=await StudentMarks.aggregate([
        {
            $match:{
                examId:exam[0]._id
            }
        },
        {
            $group:{
                _id:null,
                participants:{
                    $sum:1
                },
                averageMark:{
                    $avg:"$totalMarks"
                },
                topScore:{
                    $max:"$totalMarks"
                },
            }
        }
    ])

    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"exam analytics found",examAnalytics));
})

export const scoreDistribution=asyncHandler(async(req:Request,res:Response)=>{
    const {academicYear,examClass,examName}=req.body;

     if(!academicYear || !examClass || ! examName) throw new ApiError(StatusCode.BadRequest,"please provide all details");

     const exam=await Exam.find({
        examName,
        examClass,
        academicYear
     })

     if(!exam) throw new ApiError(StatusCode.InternalServerError,"something went wrong please try again");

     if(exam.length==0) res.status(StatusCode.NotFound).json(new ApiResponse(StatusCode.NotFound,"no such exam exist",exam));

     const scoreDistribution=await StudentMarks.aggregate([
         {
            $match:{
                examId:exam[0]._id
            }
        },
        {
            $bucket:{
                groupBy: "$totalMarks",
                boundaries: [0,11,21, 31,41,51,61,71,81,91,101],
                default: "out of range",
                output: {
                    count: { $sum: 1 },
                }
            }
        }
     ])

     res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all your range count",scoreDistribution));
})

export const passFailDistribution=asyncHandler(async(req:Request,res:Response)=>{
        const {academicYear,examClass,examName}=req.body;
        
        const exam=await Exam.find({
            examName,
            examClass,
            academicYear
        })

        if(!exam) throw new ApiError(StatusCode.InternalServerError,"something went wrong please try again");

        if(exam.length==0) res.status(StatusCode.NotFound).json(new ApiResponse(StatusCode.NotFound,"no such exam exist",exam));

        const distribution=await StudentMarks.aggregate([
             {
                $match:{
                    examId:exam[0]._id
                }
            },
            {
                $group:{
                    _id:"$status",
                    participants:{
                       $sum:1
                    }
                }
            }
        ])

        res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"distribution of pass-fail",distribution))
})

export const topStudents=asyncHandler(async(req:Request,res:Response)=>{
        const {academicYear,examClass,examName}=req.body;
        
        const exam=await Exam.find({
            examName,
            examClass,
            academicYear
        })

        if(!exam) throw new ApiError(StatusCode.InternalServerError,"something went wrong please try again");

        if(exam.length==0) res.status(StatusCode.NotFound).json(new ApiResponse(StatusCode.NotFound,"no such exam exist",exam));

        const toppers=await StudentMarks.aggregate([
             {
                $match:{
                    examId:exam[0]._id
                }
            },
            {
                $sort:{
                    totalMarks:-1
                }
            },
            {
                $limit:3
            },
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
            {
                $project:{
                     _id: 0,
                    studentId: 1,
                    percentage: 1,
                    name: "$studentInfo.name",
                    roll: "$studentInfo.rollNumber"
                }
            }
        ])
        
        res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"distribution of pass-fail",toppers))
})

