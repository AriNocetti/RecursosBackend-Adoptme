
// @ts-expect-error TS(7016): Could not find a declaration file for module 'expr... Remove this comment to see the full error message
import { Router } from 'express';

import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.post('/register', sessionsController.register);
router.post('/login', sessionsController.login);
router.post('/logout', sessionsController.logout);
router.get('/current', sessionsController.current);
router.get('/unprotectedLogin', sessionsController.unprotectedLogin);
router.get('/unprotectedCurrent', sessionsController.unprotectedCurrent);

export default router;
