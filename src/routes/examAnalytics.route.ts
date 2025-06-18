import { Router } from "express";
const examAnaltyicsRouter=Router();

import {topStudents,passFailDistribution,scoreDistribution,examAnalytics} from '../controllers/examAnalytics.controller.js'

examAnaltyicsRouter.route('/topstudent').get(topStudents);
examAnaltyicsRouter.route('/passfailnumber').get(passFailDistribution);
examAnaltyicsRouter.route('/scoredistribution').get(scoreDistribution);
examAnaltyicsRouter.route('/examstats').get(examAnalytics);

export default examAnaltyicsRouter;