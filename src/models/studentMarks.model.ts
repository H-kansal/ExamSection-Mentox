import mongoose from "mongoose";
import {IStudentMarks} from '../types/modelInterface.js'

const studentMarksSchema =new mongoose.Schema<IStudentMarks>({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    marks:{
        type:Map,
        of:Number,
    },
    grade:{
        type:Map,
        of:String,
    },
    totalMarks: {
        type: Number,
        required: true
    },
    overallGrade:{
        type: String,
        required: true
    },
    percentage:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["passed", "failed"],
        required: true
    },
    academicYear:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const StudentMarks = mongoose.model<IStudentMarks>("StudentMarks", studentMarksSchema);
export default StudentMarks;