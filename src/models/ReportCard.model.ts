import mongoose from "mongoose";
import {IReporCard} from '../types/modelInterface.js'

const reportCardSchema=new mongoose.Schema<IReporCard>({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    academicYear:{
        type:String
    },
    overallMarks:{
        type:Number
    },
    OverallGrade:{
       type:String
    },
    percentage:{
       type:Number
    },
    subjectMarks:{
        type:Map,
        of:Number
    },
    subjectGrade:{
        type:Map,
        of:String
    },
    status: {
        type: String,
        enum: ["passed", "failed"],
        required: true
    }
})

const Report=mongoose.model<IReporCard>("ReportCard",reportCardSchema);
export default Report;