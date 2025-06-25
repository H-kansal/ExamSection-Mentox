import StudentMarks from "../models/studentMarks.model.js";
import Report from "../models/ReportCard.model.js";
import { StatusCode } from "../types/statusCode.js";
import mongoose from "mongoose";
import ApiError from "./apiError.js";
import Grades from "../models/grades.model.js";

export const generateReportCard = async (academicYear: string, studentId: string): Promise<any> => {
    const studentExams = await StudentMarks.find({
        studentId: new mongoose.Types.ObjectId(studentId),
        academicYear: academicYear
    });
    if(!studentExams) throw new ApiError(StatusCode.InternalServerError,"something went wrong please try again")
        
        
    const gradeDoc = await Grades.findOne(); // or by academicYear if it's per year
    if (!gradeDoc) throw new ApiError(StatusCode.InternalServerError, "No grading scheme found");
    const gradeRules = gradeDoc.grades;
    

    let subjectAggregate: Record<string, { obtained: number, max: number }> = {};
    let totalObtained = 0;
    let totalMax = 0;
    // Aggregate marks per subject
    for (const exam of studentExams) {
        for (const [subject, mark] of exam.marks.entries()) {
        const maxMark = exam.maximumMarks?.get(subject) || 0;

        if (!subjectAggregate[subject]) {
            subjectAggregate[subject] = { obtained: 0, max: 0 };
        }

        subjectAggregate[subject].obtained += mark;
        subjectAggregate[subject].max += maxMark;

        totalObtained += mark;
        totalMax += maxMark;
        }
    }
    //Convert to array for subjectMarks
    const subjectMarks = Object.entries(subjectAggregate).map(([subject, data]) => ({
        subject,
        obtainMarks: data.obtained,
        maximumMarks: data.max
    }));

    // calculating percentage
    const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
    

    // this is grade assign function
    const getGrade = (percent: number):string => {
        for (const rule of gradeRules) {
            const [min, max] = rule.range.split('-').map(Number);
            if (percent >= min && percent <= max) {
            return  rule.grade;
            }
        }
        return "F";
    }
    // giving the subject grades
    const subjectGrade: Map<string, string> = new Map();
    for (const subject of subjectMarks) {
        const subjPercent = subject.maximumMarks > 0 ? (subject.obtainMarks / subject.maximumMarks) * 100 : 0;
        subjectGrade.set(subject.subject, getGrade(subjPercent));
    }

    const status = percentage >= 40 ? 'passed' : 'failed';
    const overallGrade = getGrade(percentage); 

    const reportCard=await Report.create({
        studentId,
        academicYear,
        overallMarks:totalObtained,
        maximumMarks:totalMax,
        OverallGrade:overallGrade,
        percentage:percentage,
        subjectMarks:subjectMarks,
        subjectGrade:subjectGrade,
        status:status
    })

    return reportCard
};
