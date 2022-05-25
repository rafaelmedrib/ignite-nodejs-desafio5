import { getRepository, Repository, ILike } from 'typeorm';

import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("game")
      .select()
      .where("game.title = :param", { param: ILike(param) } )
      .getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`
    SELECT COUNT(DISTINCT title) FROM games
    `); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<any[]> {
    return this.repository
      .createQueryBuilder()
      .relation('users')
      .of(id)
      .loadMany();
   
      // Complete usando query builder
  }
}
