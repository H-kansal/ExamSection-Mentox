import mongoose from 'mongoose'
import { IGrades } from '../types/modelInterface.js';

const GradesSchema=new mongoose.Schema<IGrades>({
    grades:{
        type:[{
            range:{
                type:String,
                required:true
            },
            grade:{
                type:Number,
                required:true
            },
            points:{
                type:Number,
                required:true
            }
        }]
    }
})

const Grades=mongoose.model<IGrades>("Grades",GradesSchema);
export default Grades;