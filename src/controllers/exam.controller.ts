import mongoose from "mongoose";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { StatusCode } from "../types/statusCode.js";
import Exam from "../models/exam.model.js";


/*
 * @description Get all exams with filtering, pagination, and sorting
 * @route GET /api/v1/exams
 * @access Public (for now, will add auth later)
 */
const getAllExams = asyncHandler(async (req: Request, res: Response) => {
    // Extract query parameters from the request
    const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = 'desc', academicYear, examTerm, examStatus } = req.query;

    // Build the search query object
    const searchQuery: any = {};
    if (query) {
        searchQuery.$or = [
            { examName: { $regex: query, $options: 'i' } },
            { examTerm: { $regex: query, $options: 'i' } }
        ];
    }
    if (academicYear) searchQuery.academicYear = academicYear;
    if (examTerm) searchQuery.examTerm = examTerm;
    if (examStatus) searchQuery.examStatus = examStatus;

    // Define sorting options
    const sortOptions: any = {};
    if (sortBy) {
        sortOptions[sortBy as string] = sortType === 'desc' ? -1 : 1;
    }
    
    // Perform aggregation to fetch exams
    const exams = await Exam.find(searchQuery)
        .sort(sortOptions)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

    const totalExams = await Exam.countDocuments(searchQuery);

    if (!exams.length) {
        throw new ApiError(StatusCode.NotFound, "No exams found");
    }

    return res.status(StatusCode.OK).json(
        new ApiResponse(StatusCode.OK, "Exams fetched successfully", {
            exams,
            totalPages: Math.ceil(totalExams / Number(limit)),
            currentPage: Number(page)
        })
    );
});

/*
 * @description Search for exams by name or term
 * @route GET /api/v1/exams/search
 * @access Public 
 */
const searchExams = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;

    if (!q) {
        throw new ApiError(StatusCode.BadRequest, "Search query 'q' is required");
    }

    const exams = await Exam.find({
        $or: [
            { examName: { $regex: q, $options: 'i' } },
            { examTerm: { $regex: q, $options: 'i' } }
        ]
    });

    if (!exams.length) {
        throw new ApiError(StatusCode.NotFound, "No exams found matching your search query");
    }

    return res.status(StatusCode.OK).json(
        new ApiResponse(StatusCode.OK, "Exams found successfully", exams)
    );
});


/*
 * @description Get a single exam by its ID
 * @route GET /api/v1/exams/:examId
 * @access Public 
 */
const getExamById = asyncHandler(async (req: Request, res: Response) => {
    const { examId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(examId)) {
        throw new ApiError(StatusCode.BadRequest, "Invalid Exam ID");
    }

    const exam = await Exam.findById(examId);

    if (!exam) {
        throw new ApiError(StatusCode.NotFound, "Exam not found");
    }

    return res.status(StatusCode.OK).json(
        new ApiResponse(StatusCode.OK, "Exam fetched successfully", exam)
    );
});


export {
    getAllExams,
    getExamById,
    searchExams
};
