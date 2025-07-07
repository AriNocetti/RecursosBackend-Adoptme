
// @ts-expect-error TS(7016): Could not find a declaration file for module 'expr... Remove this comment to see the full error message
import { Router } from 'express';

import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

router.get('/', adoptionsController.getAllAdoptions);
router.get('/:aid', adoptionsController.getAdoption);
router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;
