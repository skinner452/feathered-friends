import { CHANCES } from "@/config/chances";
import { getBirdsByRegionIdAndFoodId } from "@/data/birds";
import { Feeder } from "@/types/feeders";

export type BirdChance = {
  birdId: string;
  chancePerSecond: number;
};

export const getBirdChances = (feeder: Feeder) => {
  const birdChances: BirdChance[] = [];

  feeder.foods.forEach((feederFood) => {
    getBirdsByRegionIdAndFoodId(feeder.regionId, feederFood.foodId).forEach(
      (bird) => {
        const chancePerSecond =
          CHANCES.BIRD_APPEARS +
          CHANCES.BIRD_APPEARS_PER_FOOD * feederFood.quantity;

        const existingBirdChance = birdChances.find(
          (bc) => bc.birdId === bird.id
        );

        if (existingBirdChance) {
          existingBirdChance.chancePerSecond += chancePerSecond;
        } else {
          birdChances.push({
            birdId: bird.id,
            chancePerSecond,
          });
        }
      }
    );
  });

  return birdChances;
};
