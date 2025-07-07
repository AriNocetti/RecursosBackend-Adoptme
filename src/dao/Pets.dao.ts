import petModel from './models/Pet.js';

export default class Pet {
  constructor() {
    this.model = petModel;
  }

  get(params: any) {
    return this.model.find(params);
  }

  getBy(params: any) {
    return this.model.findOne(params);
  }

  save(doc: any) {
    return this.model.create(doc);
  }

  update(id: any, doc: any) {
    return this.model.findByIdAndUpdate(id, { $set: doc });
  }

  delete(id: any) {
    return this.model.findByIdAndDelete(id);
  }
}
