import Adoption from '../dao/Adoption.js';
import Pet from '../dao/Pets.dao.js';
import Users from '../dao/Users.dao.js';
import AdoptionRepository from '../repository/AdoptionRepository.js';
import PetRepository from '../repository/PetRepository.js';
import UserRepository from '../repository/UserRepository.js';

export const usersService = new UserRepository(new Users());
export const petsService = new PetRepository(new Pet());
export const adoptionsService = new AdoptionRepository(new Adoption());
