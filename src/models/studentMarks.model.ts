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
    totalMarks: {
        type: Number,
        required: true
    },
    weigthage:{
        type:Number
    },
    percentage:{
        type: Number,
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