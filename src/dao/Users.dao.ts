import mongoose from 'mongoose';

import userModel, { IUser, UserModelType } from './models/User';

export default class Users {
  private model: UserModelType;

  constructor() {
    this.model = userModel as UserModelType;
  }

  get(params: Partial<IUser>) {
    return this.model.find(params);
  }

  getBy(params: Partial<IUser>) {
    return this.model.findOne(params);
  }

  save(doc: IUser) {
    return this.model.create(doc);
  }

  update(id: mongoose.Types.ObjectId | string, doc: Partial<IUser>) {
    return this.model.findByIdAndUpdate(id, { $set: doc });
  }

  /**
   * Método específico para añadir documentos a un usuario
   * @param userId - ID del usuario
   * @param documents - Array de documentos a añadir
   */
  addDocuments(
    userId: mongoose.Types.ObjectId | string,
    documents: Array<{ name: string; reference: string }>,
  ) {
    // Usamos $push con $each internamente para agregar múltiples documentos
    return this.model.findByIdAndUpdate(userId, {
      $push: { documents: { $each: documents } },
    });
  }

  delete(id: mongoose.Types.ObjectId | string) {
    return this.model.findByIdAndDelete(id);
  }
}
