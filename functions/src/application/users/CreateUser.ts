
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class CreateUser {
  constructor(private repository: IUserRepository) {}
  async execute(user: any) {

    return await this.repository.create(user);
  }
}