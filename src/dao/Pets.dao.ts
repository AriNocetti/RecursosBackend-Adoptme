import petModel, { IPet, PetModelType } from './models/Pet';
import mongoose from 'mongoose';

export default class Pet {
  private model: PetModelType;
  constructor() {
    this.model = petModel as PetModelType;
  }

  get(params: Partial<IPet>) {
    return this.model.find(params);
  }

  getBy(params: Partial<IPet>) {
    return this.model.findOne(params);
  }

  save(doc: IPet) {
    return this.model.create(doc);
  }

  update(id: mongoose.Types.ObjectId | string, doc: Partial<IPet>) {
    return this.model.findByIdAndUpdate(id, { $set: doc });
  }

  delete(id: mongoose.Types.ObjectId | string) {
    return this.model.findByIdAndDelete(id);
  }
}
