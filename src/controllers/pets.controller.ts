import PetDTO from '../dto/Pet.dto.js';
import { petsService } from '../services/index.js';
import __dirname from '../utils/index.js';

const getAllPets = async (req: any, res: any) => {
  const pets = await petsService.getAll();
  res.send({ status: 'success', payload: pets });
};

const createPet = async (req: any, res: any) => {
  const { name, specie, birthDate } = req.body;
  if (!name || !specie || !birthDate)
    return res.status(400).send({ status: 'error', error: 'Incomplete values' });
  const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
  const result = await petsService.create(pet);
  return res.send({ status: 'success', payload: result });
};

const updatePet = async (req: any, res: any) => {
  const petUpdateBody = req.body;
  const petId = req.params.pid;
  await petsService.update(petId, petUpdateBody);
  return res.send({ status: 'success', message: 'pet updated' });
};

const deletePet = async (req: any, res: any) => {
  const petId = req.params.pid;
  await petsService.delete(petId);
  return res.send({ status: 'success', message: 'pet deleted' });
};

const createPetWithImage = async (req: any, res: any) => {
  const { file } = req;
  const { name, specie, birthDate } = req.body;
  if (!name || !specie || !birthDate)
    return res.status(400).send({ status: 'error', error: 'Incomplete values' });
  console.log(file);
  const pet = PetDTO.getPetInputFrom({
    name,
    specie,
    birthDate,
    image: `${__dirname}/../public/img/pets/${file.filename}`,
  });
  console.log(pet);
  const result = await petsService.create(pet);
  return res.send({ status: 'success', payload: result });
};

export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage,
};
