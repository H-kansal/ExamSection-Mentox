import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {StatusCode} from '../types/statusCode.js'
import { Request,Response } from "express";
import StudentMarks from '../models/studentMarks.model.js'
import mongoose from "mongoose";
import Student from "../models/student.mode.js";
import Exam from "../models/exam.model.js";

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

// view details of student when click on view details
export const viewDetails=asyncHandler(async(req:Request,res:Response)=>{
   const studentId:string = req.query.studentId as string;
   const examId:string = req.query.examId as string;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(examId)) {
        throw new ApiError(StatusCode.BadRequest, "Invalid Student or Exam ID");
    }

    // Fetch student details and exam marks concurrently
    const [student, studentMarks, exam] = await Promise.all([
        Student.findById(studentId).select("name rollNumber class section academicYear"),
        StudentMarks.findOne({ studentId, examId }),
        Exam.findById(examId).select("examName")
    ]);

    if (!student) {
        throw new ApiError(StatusCode.NotFound, "Student not found");
    }

    if (!studentMarks) {
        throw new ApiError(StatusCode.NotFound, "Marks for this student in the specified exam not found");
    }
    
    if (!exam) {
        throw new ApiError(StatusCode.NotFound, "Exam not found");
    }

    // Calculate overall score and average
    const totalMaximumMarks = Object.values(studentMarks.maximumMarks).reduce((sum, maxMark) => sum + (maxMark |0),0);
    const averagePercentage = studentMarks.percentage;


    // Structure the data for the frontend
    const resultPayload = {
        studentDetails: {
            name: `${student.name.firstName} ${student.name.lastName}`,
            rollNumber: student.rollNumber,
            class: `${student.class}-${student.section}`,
            academicYear: student.academicYear,
        },
        examDetails: {
            examType: exam.examName,
            overallScore: `${studentMarks.totalMarks}/${totalMaximumMarks}`,
            average: averagePercentage,
        },
        subjectWisePerformance: Object.entries(studentMarks.marks).map(([subject, mark]) => ({
            subject,
            marks: mark.obtainMarks,
            total: mark.maximumMarks,
            percentage: ((mark.obtainMarks / mark.maximumMarks) * 100).toFixed(0)
        }))
    };
    
    return res.status(StatusCode.OK).json(
        new ApiResponse(StatusCode.OK, "Student exam result fetched successfully", resultPayload)
    );
})