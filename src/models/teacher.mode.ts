import mongoose from "mongoose";
import {ITeacher} from '../types/modelInterface'
import { Schema } from "mongoose";

const teacherSchema= new Schema<ITeacher>({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subjectSpecialization: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    joiningDate:{
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);
export default Teacher;