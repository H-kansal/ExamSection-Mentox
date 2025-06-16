import mongoose from "mongoose";
import {DateSheet} from '../types/modelInterface'

const datesheetSchema = new mongoose.Schema<DateSheet>({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    academicTerm:{
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
})

const DateSheet = mongoose.model<DateSheet>("DateSheet", datesheetSchema);
export default DateSheet;