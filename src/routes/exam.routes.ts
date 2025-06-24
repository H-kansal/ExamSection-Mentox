import { Router } from "express";
import { 
    getAllExams, 
    getExamById,
    searchExams 
} from "../controllers/exam.controller.js";

const router = Router();


router.route("/").get(getAllExams);


router.route("/search").get(searchExams);


router.route("/:examId").get(getExamById);


export default router;
