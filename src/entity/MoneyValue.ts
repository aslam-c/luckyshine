import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Treasure } from "./Treasure";

@Entity("money_values")
export class MoneyValue {
  @Column()
  amt: number;

  @ManyToOne((type) => Treasure)
  @JoinColumn()
  treasure: Treasure;
}
