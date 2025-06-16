import mongoose from "mongoose";
import {Student} from '../types/modelInterface'

const studentSchema= new mongoose.Schema<Student>({
    name:{
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        }
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    class:{
        type: Number,
        required: true
    },
    section:{
        type: String,
        required: true
    },
    rollNumber:{
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    parentDetails: {
        fatherName: {
            type: String,
            required: true
        },
        motherName: {
            type: String,
            required: true
        },
        parentPhoneNumber: {
            type: String,
            required: true
        }
    },
    profilePicture: {
        type: String,
        default: "default-profile.png"
    },
    academicYear: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    admissionDetails:{
        admissionDate: {
            type: Date,
            required: true
        },
        admissionNumber: {
            type: String,
            required: true,
            unique: true
        }
    }
},{timestamps:true})

const Student = mongoose.model<Student>("Student", studentSchema);
export default Student;