import mongoose from 'mongoose';

// Interfaz genérica para los DAOs
interface IGenericDAO<T> {
  get(params: Partial<T>): any; // Mongoose Query o Promise
  getBy(params: Partial<T>): any; // Mongoose Query o Promise
  save(doc: T): any; // Mongoose Query o Promise
  update(id: mongoose.Types.ObjectId | string, doc: Partial<T>): any; // Mongoose Query o Promise
  delete(id: mongoose.Types.ObjectId | string): any; // Mongoose Query o Promise
  addDocuments?(userId: mongoose.Types.ObjectId | string, documents: any[]): any; // Método opcional para añadir documentos
}

// Clase de repositorio genérico tipada
export default class GenericRepository<T> {
  private dao: IGenericDAO<T>;

  constructor(dao: IGenericDAO<T>) {
    this.dao = dao;
  }

  getAll = (params: Partial<T> = {}) => this.dao.get(params);

  getBy = (params: Partial<T>) => this.dao.getBy(params);

  create = (doc: T) => this.dao.save(doc);

  update = (id: mongoose.Types.ObjectId | string, doc: Partial<T>) => this.dao.update(id, doc);

  delete = (id: mongoose.Types.ObjectId | string) => this.dao.delete(id);

  // Método genérico para añadir documentos (solo disponible si el DAO lo implementa)
  addDocuments = (userId: mongoose.Types.ObjectId | string, documents: any[]) => {
    if (this.dao.addDocuments) {
      return this.dao.addDocuments(userId, documents);
    }
    throw new Error('El método addDocuments no está implementado en este DAO');
  };
}
