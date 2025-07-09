import { usersService } from '../services/index';

const getAllUsers = async (req: any, res: any) => {
  const users = await usersService.getAll();
  res.send({ status: 'success', payload: users });
};

const getUser = async (req: any, res: any) => {
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user) return res.status(404).send({ status: 'error', error: 'User not found' });
  return res.send({ status: 'success', payload: user });
};

const updateUser = async (req: any, res: any) => {
  const updateBody = req.body;
  const userId = req.params.uid;
  const user = await usersService.getUserById(userId);
  if (!user) return res.status(404).send({ status: 'error', error: 'User not found' });
  await usersService.update(userId, updateBody);
  return res.send({ status: 'success', message: 'User updated' });
};

const deleteUser = async (req: any, res: any) => {
  const userId = req.params.uid;
  await usersService.getUserById(userId);
  return res.send({ status: 'success', message: 'User deleted' });
};

const uploadDocuments = async (req: any, res: any) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).send({ status: 'error', error: 'User not found' });

    // Si no hay archivos, retornar error
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ status: 'error', error: 'No files were uploaded' });
    }

    // Crear array de documentos para agregar al usuario
    const documents = req.files.map((file: any) => ({
      name: file.originalname,
      reference: `/documents/${file.filename}`,
    }));

    // Actualizar documentos del usuario usando el método específico
    await usersService.addDocuments(userId, documents);

    return res.send({ status: 'success', message: 'Documents uploaded successfully' });
  } catch (error) {
    console.error('Error al subir documentos:', error);
    return res.status(500).send({ status: 'error', error: 'Internal server error' });
  }
};

export default {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  uploadDocuments,
};
