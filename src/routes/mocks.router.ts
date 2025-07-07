
// @ts-expect-error TS(7016): Could not find a declaration file for module 'expr... Remove this comment to see the full error message
import { Router } from 'express';

import mocksController from '../controllers/mocks.controller.js';

const router = Router();

// router.get("/", mocksController.index);
router.get('/mockingpets', mocksController.mockingPets);
router.get('/mockingusers', mocksController.mockingUsers);
router.post('/generateData', mocksController.generateData);

export default router;
