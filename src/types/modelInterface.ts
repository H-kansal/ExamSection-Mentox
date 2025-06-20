import mongoose from "mongoose";

export interface ITeacher{
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

export interface IStudentMarks{
    examId: mongoose.Types.ObjectId ;
    studentId: mongoose.Types.ObjectId;
    marks: Map<string, number>;
    totalMarks: number;
    weigthage:number;
    percentage: number;
    remark:string
    academicYear:string
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IStudent{
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
   academicYear:string;
   section:string;
   subject:string;
   dueDateforMarks:Date;
}

export interface IExam{
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

export interface IDateSheet{
    academicYear: string;
    datesheet: Array<{
        subject: string;
        date: Date;
        time: string;
    }>;
    examName:string
    examClass:number
}

export interface IReporCard{
   studentId:mongoose.Types.ObjectId;
   subjectGrade:Map<string,string>;
   subjectMarks:Map<string,number>;
   percentage:number;
   OverallGrade:string;
   overallMarks:number;
   academicYear:string;
   status: "passed" | "failed";
}

export interface IGrades{
    grades: Array<{
        range: string;
        grade: string;
        points: number;
    }>;
}