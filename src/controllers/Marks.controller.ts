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
import Student from "../models/student.mode.js";


// admin side 
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
                examName:1,
                examClass:1,
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


// assign maarks to teacher from admin side
export const assignMarksToTeacher=asyncHandler(async(req:Request,res:Response)=>{
    const {academicYear,examClass,section,examName,startDate,endDate,assignTeachers}=req.body;

    if(!academicYear || !examClass || !section || !examName || !startDate || !endDate || !assignTeachers) throw new ApiError(StatusCode.BadRequest,"please provide all required fileds");
    const exam=await Exam.findOne({
            academicYear,
            examClass,
            examName
       })
       
       if(!exam) throw new ApiError(StatusCode.InternalServerError,"please try again or enter a valid exam")
    
    for(const ele of assignTeachers){
        const name={
            firstName:ele.teacher.split(" ")[0],
            lastName:ele.teacher.split(" ")[1]
        }
        const teacher=await Teacher.findOne({
            name:name,
            subjectSpecialization:{ $regex: `^${ele.subject}$`, $options: "i" }
        })
        
        if(!teacher) throw new ApiError(StatusCode.InternalServerError,"please try again or enter a valid teacher")
       

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

    const students=await Student.find({
         class:examClass,
         section:section
    })
    
    if(!students) throw new ApiError(StatusCode.InternalServerError,"something went wrong");
    for(const student of students){
        await StudentMarks.create({
            examId:exam._id,
            studentId:student._id,
            academicYear:academicYear
        })
    }



    res.status(StatusCode.Created).json(new ApiResponse(StatusCode.Created,"marks are assigned to teacher"));
})



// when teacher click on enter mark btn on teacher side
export const enterMark=asyncHandler(async(req:Request,res:Response)=>{
    const examId:string=req.query.examId as string
    const {section,subject}=req.body;   // need examid,section,subject only which are send when we are sending the teacher assign exams, this decrease the search for that specific exam

    const students=await StudentMarks.aggregate([
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
                remark:{
                    $ifNull: [`$remark.${subject}`, null]
                }
            }
       }
    ])

    if(!students) throw new ApiError(StatusCode.InternalServerError,"something went wrong please try again");
    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all students marks",students));
})


//for submit button on teacher side
export const SubmitStudentMarks=asyncHandler(async(req:Request,res:Response)=>{
      const examId:string=req.body.examId as string 
      const {subject,marks,maxMarks}=req.body;
      // marks is a object containing the studentId and the marks fot that subject and remark
      
      // loop to update the marks
      for(const entry of marks){
          const studentId:string=entry.studentId as string;
          const score=entry.score;
          const remark=entry.remark
          await StudentMarks.updateOne({
            studentId:new mongoose.Types.ObjectId(studentId),
            examId:new mongoose.Types.ObjectId(examId)
          },
          {
                $set:{
                    [`marks.${subject}`]: score,
                    [`maximumMarks.${subject}`]:maxMarks,
                    [`remark.${subject}`]:remark
                },
                $inc:{
                    totalMarks:score
                }
          })
      }

      res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"update successfully"));
})


// marks entry and view search on teacher side
export const viewMark=asyncHandler(async(req:Request,res:Response)=>{
    const {session,examClass,subject,examName,section}=req.body;

    const exam=await Exam.findOne({
        academicYear:session,
        examClass,
        examName
    })

    const students=await StudentMarks.aggregate([
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
                subjectRemark:{
                    $ifNull: [`$remark.${subject}`, null]
                }           
            }
       }
    ])

    const subjectMark=await StudentMarks.aggregate([
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
                subjectMark: `$marks.${subject}`,
                maxMark:`$maximumMarks.${subject}`
            }
        },
    ])


    
    if(!students || !subjectMark || subjectMark.length===0) throw new ApiError(StatusCode.InternalServerError,"something went wrong please try again");
    
    let totalMarks=0;
    let maximumMarks=0;
    for(const entry of subjectMark){
        totalMarks+=entry.subjectMark || 0;
        maximumMarks+=entry.maxMark || 0;
    }

    const avgMark=totalMarks/subjectMark.length;
    const avgPercentage=((totalMarks/maximumMarks)*100).toFixed(0);

    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"all students",{students,averageMark:avgMark,count:subjectMark,avgPercentage:avgPercentage}));
})
