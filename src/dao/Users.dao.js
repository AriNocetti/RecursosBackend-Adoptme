import userModel from './models/User.js';

export default class Users {
  constructor() {
    this.model = userModel;
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
