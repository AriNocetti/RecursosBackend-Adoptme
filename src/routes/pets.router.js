import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - specie
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado de la mascota
 *         name:
 *           type: string
 *           description: Nombre de la mascota
 *         specie:
 *           type: string
 *           description: Especie de la mascota
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento de la mascota
 *         adopted:
 *           type: boolean
 *           description: Indica si la mascota ha sido adoptada
 *           default: false
 *         owner:
 *           type: string
 *           description: ID del usuario dueño de la mascota (referencia a Users)
 *         image:
 *           type: string
 *           description: Ruta de la imagen de la mascota
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         name: "Puchini"
 *         specie: "Perro"
 *         birthDate: "2021-01-15T00:00:00.000Z"
 *         adopted: false
 *         owner: null
 *         image: "/img/pets/puchini.jpg"
 */

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: API para la gestión de mascotas
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtiene la lista de todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: La lista de mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 */
router.get('/', petsController.getAllPets);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Crea una nueva mascota
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specie
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la mascota
 *               specie:
 *                 type: string
 *                 description: Especie de la mascota
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento de la mascota
 *     responses:
 *       200:
 *         description: La mascota fue creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Valores incompletos
 */
router.post('/', petsController.createPet);

/**
 * @swagger
 * /api/pets/withimage:
 *   post:
 *     summary: Crea una nueva mascota con imagen
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specie
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la mascota
 *               specie:
 *                 type: string
 *                 description: Especie de la mascota
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento de la mascota
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de la mascota
 *     responses:
 *       200:
 *         description: La mascota con imagen fue creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Valores incompletos
 */
router.post('/withimage', uploader.single('image'), petsController.createPetWithImage);

/**
 * @swagger
 * /api/pets/{pid}:
 *   put:
 *     summary: Actualiza una mascota por ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la mascota
 *               specie:
 *                 type: string
 *                 description: Especie de la mascota
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento de la mascota
 *               adopted:
 *                 type: boolean
 *                 description: Estado de adopción de la mascota
 *               owner:
 *                 type: string
 *                 description: ID del usuario dueño
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: pet updated
 *       404:
 *         description: Mascota no encontrada
 */
router.put('/:pid', petsController.updatePet);

/**
 * @swagger
 * /api/pets/{pid}:
 *   delete:
 *     summary: Elimina una mascota por ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota a eliminar
 *     responses:
 *       200:
 *         description: Mascota eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: pet deleted
 *       404:
 *         description: Mascota no encontrada
 */
router.delete('/:pid', petsController.deletePet);

export default router;