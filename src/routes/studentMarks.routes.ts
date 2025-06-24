import { Router } from "express";
import { 
    getExamResultForStudent, 
    getAnnualReportCard 
} from "../controllers/studentMarks.controller.js";

const router = Router();

// Route to get a student's detailed performance for a specific exam
// Example: GET /api/v1/marks/results/student/:studentId/exam/:examId
router.route("/results/student/:studentId/exam/:examId").get(getExamResultForStudent);

// Route to get a student's annual report card for a specific academic year
// Example: GET /api/v1/marks/report-card/student/:studentId/year/:academicYear
router.route("/report-card/student/:studentId/year/:academicYear").get(getAnnualReportCard);


export default router;
