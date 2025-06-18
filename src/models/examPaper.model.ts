import mongoose from "mongoose";
import {IExamPaper} from '../types/modelInterface'

const exampaperSchema = new mongoose.Schema<IExamPaper>({
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    academicYear:{
        type: String,
        required: true
    },
    dueDateforMarks:{
        type:Date
    }
})

const ExamPaper = mongoose.model<IExamPaper>("ExamPaper", exampaperSchema);
export default ExamPaper;