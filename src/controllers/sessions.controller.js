import jwt from 'jsonwebtoken';

import UserDTO from '../dto/User.dto.js';
import { usersService } from '../services/index.js';
import { createHash, passwordValidation } from '../utils/index.js';

const register = async (req, res) => {
  try {
    const { first_name: firstName, last_name: lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).send({ status: 'error', error: 'Incomplete values' });
    const exists = await usersService.getUserByEmail(email);
    if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' });
    const hashedPassword = await createHash(password);
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
    };
    const result = await usersService.create(user);
    console.log(result);
    return res.send({ status: 'success', payload: result._id });
  } catch (error) {
    return res.status(500).send({ status: 'error', error: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ status: 'error', error: 'Incomplete values' });
    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: 'error', error: "User doesn't exist" });
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword)
      return res.status(400).send({ status: 'error', error: 'Incorrect password' });
    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: '1h' });
    user.last_connection = Date.now();
    await usersService.update(user._id, { last_connection: user.last_connection });
    return res
      .cookie('coderCookie', token, { maxAge: 3600000 })
      .send({ status: 'success', message: 'Logged in' });
  } catch (error) {
    return res.status(500).send({ status: 'error', error: 'Error al iniciar sesión' });
  }
};

const current = async (req, res) => {
  try {
    const cookie = req.cookies.coderCookie;
    if (!cookie) return res.status(401).send({ status: 'error', error: 'No autenticado' });

    const user = jwt.verify(cookie, 'tokenSecretJWT');
    return res.send({ status: 'success', payload: user });
  } catch (error) {
    return res.status(401).send({ status: 'error', error: 'Token inválido o expirado' });
  }
};

const unprotectedLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ status: 'error', error: 'Incomplete values' });
    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: 'error', error: "User doesn't exist" });
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword)
      return res.status(400).send({ status: 'error', error: 'Incorrect password' });
    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: '1h' });
    return res
      .cookie('unprotectedCookie', token, { maxAge: 3600000 })
      .send({ status: 'success', message: 'Unprotected Logged in' });
  } catch (error) {
    return res.status(500).send({ status: 'error', error: 'Error al iniciar sesión' });
  }
};
const unprotectedCurrent = async (req, res) => {
  try {
    const cookie = req.cookies.unprotectedCookie;
    if (!cookie) return res.status(401).send({ status: 'error', error: 'No autenticado' });

    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user) {
      return res.send({ status: 'success', payload: user });
    }
    return res.status(401).send({ status: 'error', error: 'Token inválido o expirado' });
  } catch (error) {
    return res
      .status(401)
      .send({ status: 'error', error: 'Token inválido/expirado o no autenticado' });
  }
};

// Logout: borra la cookie y actualiza last_connection
const logout = async (req, res) => {
  try {
    const cookie = req.cookies.coderCookie;
    if (!cookie) return res.status(400).send({ status: 'error', error: 'No session' });
    const userData = jwt.verify(cookie, 'tokenSecretJWT');
    // Actualiza last_connection
    await usersService.update(userData._id, { last_connection: Date.now() });
    return res.clearCookie('coderCookie').send({ status: 'success', message: 'Logged out' });
  } catch (error) {
    return res.status(500).send({ status: 'error', error: 'Error al cerrar sesión' });
  }
};

export default {
  current,
  login,
  register,
  logout,
  unprotectedLogin,
  unprotectedCurrent,
};
