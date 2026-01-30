import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class FindUser {
  constructor(private repository: IUserRepository) {}
  async execute(email: string) {
    return await this.repository.findByEmail(email);
  }
}