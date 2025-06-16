import mongoose from "mongoose";
import {ExamPaper} from '../types/modelInterface'

const exampaperSchema = new mongoose.Schema<ExamPaper>({
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
    academicTerm:{
        type: String,
        required: true
    }
})

const ExamPaper = mongoose.model<ExamPaper>("ExamPaper", exampaperSchema);
export default ExamPaper;