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
    maximumMarks:{
        type:Number
    },
    OverallGrade:{
       type:String
    },
    percentage:{
       type:Number
    },
    subjectMarks:{        // marks details of student of all subject 
        type:[
            {
                subject:{
                    type:String
                },
                obtainMarks:{
                    type:Number
                },
                maximumMarks:{
                    type:Number
                }
            }
        ]
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