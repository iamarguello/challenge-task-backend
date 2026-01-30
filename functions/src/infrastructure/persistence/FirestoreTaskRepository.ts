

import { db } from '../config/firebase';
import { Task } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class FirestoreTaskRepository implements ITaskRepository {
  private collection = db.collection('tasks');

  async findAll(): Promise<Task[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }

  async findById(userId: string): Promise<Task[]> {
    const snap = await this.collection
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    return snap.docs.map((item) => ({ id: item.id, ...item.data() })) as Task[]
  }

  async create(task: Task): Promise<Task> {
    const docRef = await this.collection.add(task);
    return { ...task, id: docRef.id };
  }

  async update(id: string, task: Partial<Task>): Promise<void> {
    await this.collection.doc(id).update(task);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}