import mongoose from "mongoose";
import {IDateSheet} from '../types/modelInterface.js'

const datesheetSchema = new mongoose.Schema<IDateSheet>({
    academicYear:{
        type: String,
        required: true
    },
    datesheet:{
        type: [{
            subject: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        }],
        required: true
    },
    examName:{
        type:String,
        required:true
    },
    examClass:{
        type:Number,
        required:true
    },
})

const DateSheet = mongoose.model<IDateSheet>("DateSheet", datesheetSchema);
export default DateSheet;