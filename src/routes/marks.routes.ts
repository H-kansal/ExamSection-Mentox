import {viewMark,SubmitStudentMarks,enterMark,assignMarksToTeacher,showAssignMarksPortal} from '../controllers/Marks.controller.js'

import { Router } from 'express'

const marksRouter=Router();

marksRouter.route('/showassignmarkportal').get(showAssignMarksPortal);
marksRouter.route('/assignmarkstoteacher').post(assignMarksToTeacher);
marksRouter.route('/entermark').get(enterMark);
marksRouter.route('/submitstudentmarks').post(SubmitStudentMarks);
marksRouter.route('/viewmark').get(viewMark);

export default marksRouter;