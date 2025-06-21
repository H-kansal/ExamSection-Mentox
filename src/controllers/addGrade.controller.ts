import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import {StatusCode} from '../types/statusCode.js'
import { Request,Response } from "express";
import Grades from "../models/grades.model.js";

export const createGrade=asyncHandler(async(req:Request,res:Response)=>{
    const {range,grade,points}=req.body;
    
    if(!range || !grade || !points) throw new ApiError(StatusCode.BadRequest,"please provide all details");
    const gradeScheme=await Grades.findOne();

    if(!gradeScheme) throw new ApiError(StatusCode.InternalServerError,"something went wrong");

    gradeScheme.grades.push({range,grade,points});
    await gradeScheme.save();

    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"range added"));
})

export const readGrade=asyncHandler(async(req:Request,res:Response)=>{
    
    const gradeScheme=await Grades.findOne();

    if(!gradeScheme) throw new ApiError(StatusCode.InternalServerError,"something went wrong");

    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"range added",gradeScheme));
})

export const updateGrade=asyncHandler(async(req:Request,res:Response)=>{
    const {range,grade,points}=req.body;
    
    if(!range || !grade || !points) throw new ApiError(StatusCode.BadRequest,"please provide all details");
    const gradeScheme=await Grades.findOne();

    if(!gradeScheme) throw new ApiError(StatusCode.InternalServerError,"something went wrong");

    gradeScheme.grades=gradeScheme.grades.map((ele)=>((ele.grade==grade || ele.range==range || ele.points==points)? {...ele,range:range,grade:grade,points:points}: ele))
    
    await gradeScheme.save();
    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"range added"));
})

export const deleteGrade=asyncHandler(async(req:Request,res:Response)=>{
    const {range,grade,points}=req.body;
    
    if(!range || !grade || !points) throw new ApiError(StatusCode.BadRequest,"please provide all details");
    const gradeScheme=await Grades.findOne();

    if(!gradeScheme) throw new ApiError(StatusCode.InternalServerError,"something went wrong");
    
    gradeScheme.grades=gradeScheme.grades.filter((ele)=>(
        ele.grade!=grade,
        ele.range!=range,
        ele.points!=points
    ))
    
    await gradeScheme.save();

    res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK,"range added"));
})

