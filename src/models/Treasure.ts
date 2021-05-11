import { getRepository } from "typeorm";
import { getManager } from "typeorm";
import { Treasure } from "../entity/Treasure";

export async function getTreasures(location: any, distance: number) {
  const entityManager = getManager();
  const treasures = await entityManager.query(
    `SELECT name,id FROM treasures 
  WHERE ST_DWithin(the_geom, ST_SetSRID(ST_Point($1, $2), 4326), $3)`,
    [location.longitude, location.latitude, distance]
  );
}
