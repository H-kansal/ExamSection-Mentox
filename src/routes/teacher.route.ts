import {showAllExam} from '../controllers/teacher.controller.js'
import { Router } from 'express';

const teacherRouter=Router();

teacherRouter.route('/teacherexam').get(showAllExam);

export default teacherRouter;