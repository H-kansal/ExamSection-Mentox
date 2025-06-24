import {showExam} from '../controllers/teacher.controller.js'
import { Router } from 'express';

const teacherRouter=Router();

teacherRouter.route('/teacherexam').get(showExam);
export default teacherRouter;