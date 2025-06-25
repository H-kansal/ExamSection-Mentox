import { Router } from "express";
import { 
    getAllExams, 
    getExamById,
    searchExams 
} from "../controllers/exam.controller.js";

const router = Router();


router.route("/getallexam").get(getAllExams);


router.route("/searchexam").get(searchExams);


router.route("/:examId").get(getExamById);


export default router;
