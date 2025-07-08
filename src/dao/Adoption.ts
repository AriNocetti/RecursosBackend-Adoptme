import adoptionModel, { IAdoption, AdoptionModelType } from './models/Adoption';
import mongoose from 'mongoose';

export default class Adoption {
  private model: AdoptionModelType;
  constructor() {
    this.model = adoptionModel as AdoptionModelType;
  }

  get(params: Partial<IAdoption>) {
    return this.model.find(params);
  }

  getBy(params: Partial<IAdoption>) {
    return this.model.findOne(params);
  }

  save(doc: IAdoption) {
    return this.model.create(doc);
  }

  update(id: mongoose.Types.ObjectId | string, doc: Partial<IAdoption>) {
    return this.model.findByIdAndUpdate(id, { $set: doc });
  }

  delete(id: mongoose.Types.ObjectId | string) {
    return this.model.findByIdAndDelete(id);
  }
}
