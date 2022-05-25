import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Game } from "./Game";

@Entity("genres")
class Genre {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  name:string;

  @ManyToMany(() => Game, game => game.genres)
  @JoinTable()
  games: Game[];

  @Column()
  description: string;
}

export { Genre }