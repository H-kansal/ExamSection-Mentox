import {showExam} from '../controllers/teacher.controller.js'
import { Router } from 'express';
import {updateRequest} from '../middleware/teacherAuth.middleware.js'
const teacherRouter=Router();

// auth middleware will be applied for teacher
teacherRouter.route('/teacherexam').get(updateRequest,showExam);
export default teacherRouter;