import GenericRepository from './GenericRepository.js';

export default class UserRepository extends GenericRepository {
  // constructor(dao) {
  //   super(dao);
  // }
  // El constructor se hereda automáticamente de GenericRepository
  // seria inutil agregarlo ya que no agrega funcionalidad

  getUserByEmail = email => this.getBy({ email });

  getUserById = id => this.getBy({ _id: id });
}
