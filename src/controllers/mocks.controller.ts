import { faker } from '@faker-js/faker';

import { IUser } from '../dao/models/User';
import PetDTO from '../dto/Pet.dto';
import { petsService, usersService } from '../services/index';
import { createHash } from '../utils/index';

const mockingPets = async (req: any, res: any) => {
  try {
    const num = 100;
    const pets = [];

    for (let i = 0; i < num; i += 1) {
      const pet = PetDTO.getPetInputFrom({
        name: faker.animal.petName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past().toISOString(),
        adopted: false,
        image: faker.image.avatar(),
      });
      // Crear cada mascota individualmente
      await petsService.create(pet);
      pets.push(pet);
    }

    res.status(200).send({ status: 'success', payload: pets });
  } catch (error) {
    res.status(500).send({ status: 'error', error: 'Failed to generate pets' });
  }
};

const mockingUsers = async (req: any, res: any) => {
  try {
    const num = 50;
    const users = [];
    const hashedPassword = await createHash('coder123');

    for (let i = 0; i < num; i += 1) {
      // Generamos un ID de MongoDB simulado
      const mockId = faker.database.mongodbObjectId();

      const user: IUser = {
        _id: mockId,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: [],
        last_connection: faker.date.recent(),
        documents: [],
      };
      users.push(user);
    }

    // No creamos realmente los usuarios en la base de datos para evitar conflictos
    // const result = await usersService.create(users);
    console.log('Ejecutando versión actualizada del mockingUsers');
    res.status(200).send({ status: 'success', message: 'Versión actualizada', payload: users });
  } catch (error) {
    res.status(500).send({ status: 'error', error: 'Failed to generate users' });
  }
};

const generateData = async (req: any, res: any) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const generatedUsers = [];
    const hashedPassword = await createHash('coder123');

    for (let i = 0; i < users; i += 1) {
      // Generamos un ID de MongoDB simulado
      const mockId = faker.database.mongodbObjectId();

      const user = {
        _id: mockId,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: [],
        __v: 0,
        last_connection: faker.date.recent(),
        documents: [],
      };
      generatedUsers.push(user);
    }

    const generatedPets = [];
    for (let i = 0; i < pets; i += 1) {
      const pet = PetDTO.getPetInputFrom({
        name: faker.animal.petName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past().toISOString(),
        adopted: false,
        image: faker.image.avatar(),
      });
      generatedPets.push(pet);
    }

    // Crear cada usuario y mascota individualmente
    for (const user of generatedUsers) {
      await usersService.create(user);
    }

    for (const pet of generatedPets) {
      await petsService.create(pet);
    }

    res.status(200).send({
      status: 'success',
      payload: {
        users: generatedUsers,
        pets: generatedPets,
      },
    });
  } catch (error) {
    res.status(500).send({ status: 'error', error: 'Failed to generate data' });
  }
};

export default {
  mockingPets,
  mockingUsers,
  generateData,
};
