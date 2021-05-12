import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Treasure } from "./Treasure";

@Entity("money_values")
export class MoneyValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amt: number;

  @ManyToOne((type) => Treasure)
  @JoinColumn()
  treasure: Treasure;
}
