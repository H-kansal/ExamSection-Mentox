import {marksFilter,viewDetails} from '../controllers/Filters.controller.js'

import { Router } from 'express'

const filterRouter=Router();

filterRouter.route('/filterstudent').get(marksFilter);
filterRouter.route('/viewdetails').get(viewDetails);

export default filterRouter;