
// @ts-expect-error TS(7016): Could not find a declaration file for module 'expr... Remove this comment to see the full error message
import { Router } from 'express';

import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/', petsController.getAllPets);
router.post('/', petsController.createPet);
router.post('/withimage', uploader.single('image'), petsController.createPetWithImage);
router.put('/:pid', petsController.updatePet);
router.delete('/:pid', petsController.deletePet);

export default router;
