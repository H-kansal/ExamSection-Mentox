import mongoose from "mongoose";

export interface ITeacher {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    subjectSpecialization: string;
    phoneNumber: string;
    address: string;
    joiningDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IStudentMarks {
    examId: mongoose.Types.ObjectId ;
    studentId: mongoose.Types.ObjectId;
    marks: Map<string, number>;
    grade: Map<string, string>;
    totalMarks: number;
    overallGrade: string;
    percentage: number;
    status: "passed" | "failed";
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IStudent {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    class: number;
    section: string;
    rollNumber: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
    parentDetails: {
        fatherName: string;
        motherName: string;
        parentPhoneNumber: string;
    };
    profilePicture?: string;
    academicYear: string;
    status?: "active" | "inactive";
    admissionDetails: {
        admissionDate: Date;
        admissionNumber: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IExamPaper{
   examId:mongoose.Types.ObjectId;
   teacherId:mongoose.Types.ObjectId;
   academicTerm:string;
   subject:string;
}

export interface IExam {
    datesheetId:mongoose.Types.ObjectId;
    examName: string;
    examClass: number;
    examStatus: "active" | "completed" | "draft";
    examTerm: string;
    examDateRange: string;
    academicYear: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IDateSheet {
    academicTerm: string;
    datesheet: Array<{
        subject: string;
        date: Date;
        time: string;
    }>;
    examName:string
    examClass:number
}