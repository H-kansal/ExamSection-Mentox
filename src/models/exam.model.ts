import mongoose from "mongoose";
import {Exam} from '../types/modelInterface'
const examSchema=new mongoose.Schema<Exam>({
    examName:{
        type:String,
        required:true
    },
    examClass:{
        type:Number,
        required:true
    },
    examStatus:{
        type:String,
        enum:["active","completed","draft"],
        default:"active"
    },
    examTerm:{
        type:String,
        required:true
    },
    examDateRange:{
        type:String,
        required:true
    },
    academicYear:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Exam=mongoose.model<Exam>("Exam",examSchema);
export default Exam;