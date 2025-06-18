import {addNewExam} from '../controllers/newExam.controller.js'
import { Router } from 'express'

const newExamRouter=Router();

newExamRouter.route('/newExam').post(addNewExam);

export default newExamRouter;