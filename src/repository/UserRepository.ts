import GenericRepository from './GenericRepository';
import { IUser } from '../dao/models/User';
import mongoose from 'mongoose';

export default class UserRepository extends GenericRepository<IUser> {
  // El constructor se hereda automáticamente de GenericRepository
  // seria inutil agregarlo ya que no agrega funcionalidad

  getUserByEmail = (email: string) => this.getBy({ email });

  getUserById = (id: mongoose.Types.ObjectId | string) => this.getBy({ _id: id as any });
}
