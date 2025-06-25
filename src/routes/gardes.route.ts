import { createGrade,deleteGrade,readGrade,updateGrade } from "../controllers/addGrade.controller.js";

import { Router } from "express";

const gradeRouter=Router();

gradeRouter.route('/creategrade').post(createGrade);
gradeRouter.route('/deletegrade').delete(deleteGrade);
gradeRouter.route('/readgrade').get(readGrade);
gradeRouter.route('/updategrade').post(updateGrade);

export default gradeRouter;