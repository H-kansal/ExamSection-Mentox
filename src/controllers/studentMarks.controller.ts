import mongoose from "mongoose";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { StatusCode } from "../types/statusCode.js";
import Student from "../models/student.mode.js";
import StudentMarks from "../models/studentMarks.model.js";
import Report from "../models/ReportCard.model.js";
import Exam from "../models/exam.model.js";
import {generateReportCard} from '../utils/generateAnnualReport.js'

/**
 * @description Get a student's detailed performance for a specific exam
 * @route GET /api/v1/marks/results/student/:studentId/exam/:examId
 * @access Private (e.g., student, parent, teacher)
 */
const getExamResultForStudent = asyncHandler(async (req: Request, res: Response) => {
    const { studentId, examId } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(examId)) {
        throw new ApiError(StatusCode.BadRequest, "Invalid Student or Exam ID");
    }

    // Fetch student details and exam marks concurrently
    const [student, studentMarks, exam] = await Promise.all([
        Student.findById(studentId).select("name rollNumber class section academicYear"),
        StudentMarks.findOne({ studentId:new mongoose.Types.ObjectId(studentId), examId:new mongoose.Types.ObjectId(examId) }),
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
});


// get annual report card
const getAnnualReportCard = asyncHandler(async (req: Request, res: Response) => {
    const { resultClass, academicYear } = req.params;
    const studentId:string=req.user?.id as string;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        throw new ApiError(StatusCode.BadRequest, "Invalid Student ID");
    }

    // Fetch student and report card data concurrently
    let reportCard=await Report.findOne({ studentId:new mongoose.Types.ObjectId(studentId), academicYear })

    if(!reportCard){
         try{
             reportCard = await generateReportCard(academicYear, studentId);
         }catch(error:any){
            throw new ApiError(StatusCode.InternalServerError,error.message)
         }
    }
    const student= await Student.findById(studentId).select("name rollNumber class section")
    
    if (!student) {
        throw new ApiError(StatusCode.NotFound, "Student not found");
    }

    // Structure the data for the frontend
    // Note: The UI for "Annual Result" seems to show Theory and Practical marks, 
    // but the `ReportCard.model` only has `obtainMarks` and `maximumMarks`.
    // I will structure the response based on the model. This may need adjustment
    // if you add theory/practical fields to the model later.
    const reportCardPayload = {
        studentDetails: {
            name: `${student.name.firstName} ${student.name.lastName}`,
            rollNumber: student.rollNumber,
            class: `${student.class}-${student.section}`,
            academicYear: reportCard?.academicYear,
        },
        subjectWisePerformance: reportCard?.subjectMarks.map(mark => ({
            subjectName: mark.subject,
            // Assuming obtainMarks is total theory+practical for now
            theoryMarks: mark.obtainMarks, // Placeholder, adjust if model changes
            practicalMarks: "N/A", // Placeholder, adjust if model changes
            totalMarks: mark.obtainMarks,
            maxMarks: mark.maximumMarks,
            grade: reportCard.subjectGrade.get(mark.subject) || "N/A"
        })),
        summary: {
            remarks: reportCard?.status === "passed" ? "Excellent" : "Needs Improvement", // Example logic
            totalMarks: reportCard?.overallMarks,
            maxMarks: reportCard?.maximumMarks,
            finalGrade: reportCard?.OverallGrade
        }
    };

    return res.status(StatusCode.OK).json(
        new ApiResponse(StatusCode.OK, "Student annual report fetched successfully", reportCardPayload)
    );
});


export {
    getExamResultForStudent,
    getAnnualReportCard
};
