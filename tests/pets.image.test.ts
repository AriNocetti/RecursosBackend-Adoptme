
// @ts-expect-error TS(7016): Could not find a declaration file for module 'chai... Remove this comment to see the full error message
import { expect } from 'chai';

// @ts-expect-error TS(7016): Could not find a declaration file for module 'moch... Remove this comment to see the full error message
import { describe, it } from 'mocha';
import mongoose from 'mongoose';

// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import supertest from 'supertest';

import app from '../src/app.js';

//* Para mantener la validación estricta de consultas
mongoose.set('strictQuery', true);

// URL de conexión a la base de datos de testing
// const MONGO_URI = process.env.MONGO_DB_URL;

// Instancia de supertest apuntando a tu servidor
// const requester = supertest("http://localhost:8080");
const requester = supertest(app);

describe('Test uploads', () => {
  it('Debe poder crearse una mascota con la ruta de la imagen', async () => {
    // Mock de mascota a crear
    const mockPet = {
      name: 'Nemo',
      specie: 'Pez',
      birthDate: '10-11-2022',
    };

    // router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);
    const result = await requester
      .post('/api/pets/withimage')
      .field('name', mockPet.name)
      .field('specie', mockPet.specie)
      .field('birthDate', mockPet.birthDate)
      .attach('image', './tests/files/coderDog.jpg');

    expect(result.status).to.be.eql(200);
    expect(result.body.payload).to.have.property('_id');
  });
});
