import mongoose from 'mongoose';

import { IUserDocument } from '../dao/models/User';

// Interfaz genérica para los DAOs
interface IGenericDAO<T> {
  get(params: Partial<T>): Promise<T[]>;
  getBy(params: Partial<T>): Promise<T | null>;
  save(doc: T): Promise<T>;
  update(id: mongoose.Types.ObjectId | string, doc: Partial<T>): Promise<T | null>;
  delete(id: mongoose.Types.ObjectId | string): Promise<boolean>;
  addDocuments?(userId: mongoose.Types.ObjectId | string, documents: IUserDocument[]): Promise<T>;
}

// Clase de repositorio genérico tipada
export default class GenericRepository<T> {
  private dao: IGenericDAO<T>;

  constructor(dao: IGenericDAO<T>) {
    this.dao = dao;
  }

  getAll = (params: Partial<T> = {}): Promise<T[]> => this.dao.get(params);

  getBy = (params: Partial<T>): Promise<T | null> => this.dao.getBy(params);

  create = (doc: T): Promise<T> => this.dao.save(doc);

  update = (id: mongoose.Types.ObjectId | string, doc: Partial<T>): Promise<T | null> =>
    this.dao.update(id, doc);

  delete = (id: mongoose.Types.ObjectId | string): Promise<boolean> => this.dao.delete(id);

  addDocuments = (
    userId: mongoose.Types.ObjectId | string,
    documents: IUserDocument[],
  ): Promise<T> => {
    if (this.dao.addDocuments) {
      return this.dao.addDocuments(userId, documents);
    }
    throw new Error('El método addDocuments no está implementado en este DAO');
  };
}
