import { CreateUser } from "../../application/users/CreateUser";
import { FindUser } from "../../application/users/FindUser";
import { FirestoreUserRepository } from "../persistence/FireStoreUserRepository";

const userRepository = new FirestoreUserRepository();

export const getUserUseCase = new FindUser(userRepository);
export const addUserUseCase = new CreateUser(userRepository);