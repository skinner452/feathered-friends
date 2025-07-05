import { CHANCES } from "@/config/chances";
import { BIRDS } from "@/data/birds";
import { Bird } from "@/types/bird";
import { Feeder } from "@/types/feeders";

export type BirdChance = {
  bird: Bird;
  chancePerSecond: number;
};

export const getBirdChances = (feeder: Feeder) => {
  const birdChances: BirdChance[] = [];

  feeder.foods.forEach((feederFood) => {
    BIRDS.filter(
      (bird) =>
        bird.region.id === feeder.region.id &&
        bird.foods.some((f) => f.id === feederFood.food.id)
    ).forEach((bird) => {
      const chancePerSecond =
        CHANCES.BIRD_APPEARS +
        CHANCES.BIRD_APPEARS_PER_FOOD * feederFood.quantity;

      const existingBirdChance = birdChances.find(
        (bc) => bc.bird.id === bird.id
      );

      if (existingBirdChance) {
        existingBirdChance.chancePerSecond += chancePerSecond;
      } else {
        birdChances.push({
          bird,
          chancePerSecond,
        });
      }
    });
  });

  return birdChances;
};
