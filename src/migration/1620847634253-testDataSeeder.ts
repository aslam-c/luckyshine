import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { UserSeeds } from "./seeds/users.seed";
import { TreasureSeeds } from "./seeds/treasures.seed";
import { MoneyValueSeeds } from "./seeds/money_value.seed";

export class testDataSeeder1620847634253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const Users = await getRepository("User").save(UserSeeds);
    const TreasureLocations = TreasureSeeds.map((TreasureRow) => {
      const locationCordinates = [TreasureRow.longitude, TreasureRow.latitude];
      const point = { type: "Point", coordinates: locationCordinates };
      const TreasureData = { location: point, ...TreasureRow };
      return TreasureData;
    });
    const Treasures = await getRepository("treasures").save(TreasureLocations);
    const MoneyValues = await getRepository("MoneyValue").save(MoneyValueSeeds);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
