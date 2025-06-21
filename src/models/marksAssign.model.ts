import mongoose from "mongoose";
import {IExamPaper} from '../types/modelInterface.js'

const marksAssignSchema = new mongoose.Schema<IExamPaper>({
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
    section:{
       type:String,
    },
    academicYear:{
        type: String,
        required: true
    },
    startDate:{
        type:Date
    },
    dueDateforMarks:{
        type:Date
    }
})

const MarksAssign = mongoose.model<IExamPaper>("MarksAssign", marksAssignSchema);
export default MarksAssign;