import { faker } from "@faker-js/faker";
import PetDTO from "../dto/Pet.dto.js";
import { petsService, usersService } from "../services/index.js";
import { createHash } from "../utils/index.js";

// const index = async (req, res) => {
//     try {
//         res.send({
//             status: "success",
//             payload: {
//                 mocks: true,
//             },
//         });
//     } catch (error) { }
// };

const mockingPets = async (req, res) => {
    try {
        const num = 100;
        const pets = [];

        for (let i = 0; i < num; i++) {
            const pet = PetDTO.getPetInputFrom({
                name: faker.animal.petName(),
                specie: faker.animal.type(),
                birthDate: faker.date.past().toISOString(),
                adopted: false,
                image: faker.image.avatar(),
            });
            pets.push(pet);
        }

        const result = await petsService.create(pets);

        res.status(200).send({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Failed to generate pets" });
    }
};

const mockingUsers = async (req, res) => {
    try {
        const { num = 50 } = req.body;
        const users = [];
        const hashedPassword = await createHash("coder123");

        for (let i = 0; i < num; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: hashedPassword,
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: [],
            };
            users.push(user);
        }

        const result = await usersService.create(users);
        res.status(200).send({ status: "success", payload: users });
    } catch (error) {
        res
            .status(500)
            .send({ status: "error", error: "Failed to generate users" });
    }
};

const generateData = async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;

        const generatedUsers = [];
        const hashedPassword = await createHash("coder123");

        for (let i = 0; i < users; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: hashedPassword,
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: [],
            };
            generatedUsers.push(user);
        }

        const generatedPets = [];
        for (let i = 0; i < pets; i++) {
            const pet = PetDTO.getPetInputFrom({
                name: faker.animal.petName(),
                specie: faker.animal.type(),
                birthDate: faker.date.past().toISOString(),
                adopted: false,
                image: faker.image.avatar(),
            });
            generatedPets.push(pet);
        }

        await usersService.create(generatedUsers);
        await petsService.create(generatedPets);

        res.status(200).send({
            status: "success",
            payload: {
                users: generatedUsers,
                pets: generatedPets,
            },
        });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Failed to generate data" });
    }
};

export default {
    index,
    mockingPets,
    mockingUsers,
    generateData,
};