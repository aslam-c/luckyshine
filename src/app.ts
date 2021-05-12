import * as express from "express";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { createConnection } from "typeorm";
import { Treasure } from "./entity/Treasure";
import { getTreasures } from "./models/Treasure";
// create and setup express app
const app = express();
app.use(express.json());

createConnection().then((connection) => {
  const TreasureRepo = connection.getRepository(Treasure);
}); //connect typeorm

app.post(
  "/nearby_treasures",
  body("latitude").notEmpty().withMessage("Latitude is required"),
  body("longitude").notEmpty().withMessage("Longitude is required"),
  body("distance")
    .notEmpty()
    .withMessage("Distance is required")
    .isIn([1, 10])
    .withMessage("Distange must be 1 or 10 "),
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const treasures = await getTreasures(
        {
          longitude: req.body.longitude,
          latitude: req.body.Latitude,
        },
        req.body.distance
      );

      res.status(200).json(treasures);
    }
  }
);

// start express server
app.listen(3000, () => {
  console.log("listening on port 3000");
});
