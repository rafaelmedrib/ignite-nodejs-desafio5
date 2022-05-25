import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Game } from "../../games/entities/Game";
import { User } from "../../users/entities/User";

@Entity("orders")
class Order {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @ManyToMany(() => Game, game => game.orders)
  @JoinColumn()
  games: Game[]

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;
}

export { Order }