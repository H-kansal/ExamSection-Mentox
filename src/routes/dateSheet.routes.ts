import { Router } from "express";
import {createDateSheet,editDateSheet,deleteDatesheet,searchDateSheet} from '../controllers/DateSheet.controller.js'
const datesheetRouter=Router();


datesheetRouter.route('/createdatasheet').post(createDateSheet)
datesheetRouter.route('/editdatasheet').put(editDateSheet)
datesheetRouter.route('/deletedatasheet/').delete(deleteDatesheet)
datesheetRouter.route('/searchdatasheet').get(searchDateSheet)

export default datesheetRouter;