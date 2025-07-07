import adoptionModel from './models/Adoption.js';

export default class Adoption {
  constructor() {
    this.model = adoptionModel;
  }

  get(params) {
    return this.model.find(params);
  }

  getBy(params) {
    return this.model.findOne(params);
  }

  save(doc) {
    return this.model.create(doc);
  }

  update(id, doc) {
    return this.model.findByIdAndUpdate(id, { $set: doc });
  }

  delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}
