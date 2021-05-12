import { MigrationInterface, QueryRunner } from "typeorm";

export class luckyshine1620751055971 implements MigrationInterface {
  name = "luckyshine1620751055971";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "treasures" ("id" SERIAL NOT NULL, "location" geometry(Point,4326) NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_14552091a1c683ecd477b6c449b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "money_values" ("id" SERIAL NOT NULL, "amt" integer NOT NULL, "treasureId" integer, CONSTRAINT "PK_8834001246187da755f1df455a8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "money_values" ADD CONSTRAINT "FK_b60c13534d08b2851d8b1ec146e" FOREIGN KEY ("treasureId") REFERENCES "treasures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "money_values" DROP CONSTRAINT "FK_b60c13534d08b2851d8b1ec146e"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "money_values"`);
    await queryRunner.query(`DROP TABLE "treasures"`);
  }
}
