import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOneOrFail({
      relations: ["games"],
      where: {
        id: user_id
      }
    })
    
    if(!user){
      throw new Error("User not found");
    }

    return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`
    SELECT * FROM users ORDER BY first_name
    `);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const query = `SELECT * FROM users WHERE LOWER(first_name) = '${first_name.toLowerCase()}' AND LOWER(last_name) = '${last_name.toLowerCase()}'`
    return this.repository.query(query); // Complete usando raw query
  }
}
