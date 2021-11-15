import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { User } from "./entities/user";
import { UserRegistration } from "./schemas/userRegistration.payload";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  public getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public getUserByName(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  public createUser(payload: UserRegistration): Promise<User> {
    return this.usersRepository.save(payload);
  }

  public updateUserById(
    userId: number,
    payload: Partial<User>
  ): Promise<UpdateResult> {
    return this.usersRepository.update({ id: userId }, payload);
  }

  public deleteUserById(userId: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id: userId });
  }
}
