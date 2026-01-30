import { db } from '../config/firebase';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class FirestoreUserRepository implements IUserRepository {
  private collection = db.collection('users');

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection.where('email', '==', email).limit(1).get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      email: data.email
    } as User;
  }


  async create(user: User): Promise<User> {
    const resp = await this.collection.add({
      email: user.email,
      createdAt: Date.now()
    }); 
    return { id: resp.id, email: user.email, createdAt: user.createdAt }
  }
}