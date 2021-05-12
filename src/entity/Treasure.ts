import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MoneyValue } from "./MoneyValue";

@Entity("treasures")
export class Treasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "geometry",
    nullable: false,
    spatialFeatureType: "Point",
    srid: 4326,
  })
  location: string;

  @Column()
  name: string;

  @OneToMany((type) => MoneyValue, (MoneyValue) => MoneyValue.treasure)
  money_values: MoneyValue[];
}
