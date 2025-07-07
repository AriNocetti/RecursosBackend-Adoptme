export default class GenericRepository {
  constructor(dao: any) {
    this.dao = dao;
  }

  getAll = (params: any) => this.dao.get(params);

  getBy = (params: any) => this.dao.getBy(params);

  create = (doc: any) => this.dao.save(doc);

  update = (id: any, doc: any) => this.dao.update(id, doc);

  delete = (id: any) => this.dao.delete(id);
}
