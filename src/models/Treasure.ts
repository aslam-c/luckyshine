import { getConnection } from "typeorm";
import { Treasure } from "../entity/Treasure";

export async function getTreasures(location: any, distance: number) {
  const TreasureRepo = getConnection().getRepository(Treasure);
  const distanceInKm = distance * 1000;

  const treasures = await TreasureRepo.query(
    `SELECT name,id FROM treasures 
  WHERE ST_DWithin(location, ST_SetSRID(ST_Point($1, $2), 4326), $3)`,
    [location.longitude, location.latitude, distanceInKm]
  );
  console.log(treasures);
  return treasures;
}
