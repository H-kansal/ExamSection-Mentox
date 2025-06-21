import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {StatusCode} from '../types/statusCode.js'
import { Request,Response } from "express";
import StudentMarks from "../models/studentMarks.model.js";
import mongoose from "mongoose";
import Exam from "../models/exam.model.js";
import Teacher from "../models/teacher.mode.js";
import MarksAssign from "../models/marksAssign.model.js";

export const showAssignMarksPortal=asyncHandler(async(req:Request,res:Response)=>{
    const {academicYear,examName}=req.body;
    
    if(!academicYear || !examName) throw new ApiError(StatusCode.BadRequest,"please provide all fields");
    
    const allexams=await Exam.aggregate([
        {
            $match:{
                academicYear:academicYear,
                examName:examName
            }
        },
        {
            $lookup:{
                from:"datesheets",
                localField:"datesheetId",
                foreignField:"_id",
                as:"datesheetinfo"
            }
        },
        {
            $unwind:"$datesheetinfo"
        },
        {
            $project:{
                datesheetId:0,
                examDateRange:0,
                examName:1,
                sectionsCount:{$size:"$sections"},
                examTerm:1,
                academicYear:1,
                subjects:"$datesheetinfo.datesheet",
                subjectsCount:{$size:"$datesheetinfo.datesheet"}
            }
        }
    ])
    
    if(!allexams) throw new ApiError(StatusCode.InternalServerError,"something went wronng");
    
    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all exams send",allexams));
})


export const assignMarksToTeacher=asyncHandler(async(req:Request,res:Response)=>{
    const {academicYear,examClass,section,examName,startDate,endDate,assignTeachers}=req.body;

    if(!academicYear || !examClass || !section || !examName || !startDate || !endDate || !assignTeachers) throw new ApiError(StatusCode.BadRequest,"please provide all required fileds");
    
    
    for(const ele of assignTeachers){
        const teacher=await Teacher.findOne({
            name:ele.teacher,
            subjectSpecialization:ele.subject
        })
        
        if(!teacher) throw new ApiError(StatusCode.InternalServerError,"please try again or enter a valid teacher")
       const exam=await Exam.findOne({
            academicYear,
            examClass,
            examName
       })
       
       if(!exam) throw new ApiError(StatusCode.InternalServerError,"please try again or enter a valid exam")

       const assigned=await MarksAssign.create({
            teacherId:teacher?._id,
            examId:exam?._id,
            subject:ele.subject,
            section:section,
            academicYear:academicYear,
            startDate:startDate,
            dueDateforMarks:endDate
       })

       if(!assigned) throw new ApiError(StatusCode.InternalServerError,"please try again")
    }

    res.status(StatusCode.Created).json(new ApiResponse(StatusCode.Created,"marks are assigned to teacher"));
})

export const enterMark=asyncHandler(async(req:Request,res:Response)=>{
    const examId:string=req.body.examId as string
    const {section,subject}=req.body;   // need examid,section,subject only which are send when we are sending the teacher assign exams, this decrease the search for that specific exam

    const students=StudentMarks.aggregate([
        {
            $match:{
                examId:new mongoose.Types.ObjectId(examId)
            }
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
            $match:{
                "studentInfo.section":section,
                 
            }
        },
        {
            $project: {
                examId:1,
                studentId: 1,
                name: "$studentInfo.name",
                roll: "$studentInfo.rollNumber",
                subjectMarks: {
                    $ifNull: [`$marks.${subject}`, null]
                },
                remark:1           
            }
       }
    ])

    if(!students) throw new ApiError(StatusCode.InternalServerError,"something went wrong please try again");
    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all students marks",students));
})

export const SubmitStudentMarks=asyncHandler(async(req:Request,res:Response)=>{
      const examId:string=req.body.examId as string 
      const {subject,marks}=req.body;
      // marks is a object containing the studentId and the marks fot that subject
      
      // loop to update the marks
      for(const entry of marks){
          const studentId:string=entry.studentId as string;
          const {score}=req.body;

          await StudentMarks.updateOne({
            studentId:new mongoose.Types.ObjectId(studentId),
            examId:new mongoose.Types.ObjectId(examId)
          },
          {
                $set:{
                    [`marks.${subject}`]: score    // have to change!!!! also update from all other controllers
                }
          })
      }

      res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"update successfully"));
})

export const viewMark=asyncHandler(async(req:Request,res:Response)=>{
    const {session,examClass,subject,examName,section}=req.body;

    const exam=await Exam.findOne({
        academicYear:session,
        examClass,
        examName
    })

    const students=StudentMarks.aggregate([
        {
            $match:{
                examId:exam?._id
            }
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
            $match:{
                "studentInfo.section":section,
            }
        },
        {
            $project: {
                examId:1,
                studentId: 1,
                name: "$studentInfo.name",
                roll: "$studentInfo.rollNumber",
                subjectMarks: {
                    $ifNull: [`$marks.${subject}`, null]
                },
                remark:1           
            }
       }
    ])

    const averageMark=await StudentMarks.aggregate([
        {
            $match:{
                examId:exam?._id
            }
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
            $match:{
                "studentInfo.section":section,
            }
        },
        {
            $project: {
                subjectMark: `$marks.${subject}`
            }
        },

        //Filter out documents where subject mark is null
        {
            $match: {
                subjectMark: { $ne: null }
            }
        },

        // Group to calculate average
        {
            $group: {
                _id: null,
                averageMarks: { $avg: "$subjectMark" },
                count: { $sum: 1 }
            }
        }
    ])
    
    if(!students || !averageMark) throw new ApiError(StatusCode.InternalServerError,"something went wrong please try again");

    if(averageMark.length>0){
        res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all students",{students,averageMark}));
    }else{
        res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all students",{students,averageMark:{averageMark:0}}));
    }
})
