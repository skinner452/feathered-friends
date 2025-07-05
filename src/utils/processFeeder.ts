import { deepCloneFeeder, Feeder, FeederFeather } from "@/types/feeders";
import { getBirdChances } from "./birdChances";
import { CHANCES } from "@/config/chances";
import { randomBoolean, randomInRange, selectRandom } from "./random";
import { getFeatherByBirdId } from "@/data/feathers";
import { formatDuration } from "./duration";

// This function processes the feeder, simulating bird appearances, food consumption, and feather drops.
// It returns the updated feeder state along with statistics on birds appeared, feathers dropped, and food eaten.
// It uses a deep clone of the feeder to avoid mutation errors.
export const processFeeder = (prevFeeder: Feeder, seconds: number) => {
  let birdsAppeared = 0;
  let birdsLeft = 0;
  let foodEaten = 0;
  let feathersDropped = 0;

  // Deep copy of the feeder to avoid mutation errors
  const feeder = deepCloneFeeder(prevFeeder);

  for (let i = 0; i < seconds; i++) {
    const birdChances = getBirdChances(feeder);

    // Check if a new bird appears
    birdChances.forEach((bc) => {
      const x = Math.random();
      if (x < bc.chancePerSecond) {
        feeder.birds.push({
          id: crypto.randomUUID(),
          bird: bc.bird,
          location: {
            x: randomInRange(0.2, 0.8),
            y: randomInRange(0.2, 0.8),
            scale: randomInRange(0.3, 1),
          },
          isFlipped: randomBoolean(),
          isSpotted: false,
        });

        console.log("feeder.birds", feeder.birds);

        birdsAppeared += 1;

        console.log(`A new bird appeared: ${bc.bird.name}`);
      }
    });

    // Check for bird actions
    feeder.birds.forEach((feederBird, idx) => {
      const feederFoodsForBird = feeder.foods.filter((feederFood) =>
        feederBird.bird.foods.some(
          (birdFood) => birdFood.id === feederFood.food.id
        )
      );

      if (feederFoodsForBird.length === 0) {
        // If the bird has no food source, remove it
        feeder.birds.splice(idx, 1);
        birdsLeft += 1;
        console.log(
          `Bird left because it's out of food: ${feederBird.bird.name}`
        );
        return;
      }

      const x = Math.random();
      if (x < CHANCES.BIRD_LEAVES) {
        feeder.birds.splice(idx, 1);
        birdsLeft += 1;
        console.log(`Bird left by chance: ${feederBird.bird.name}`);
        return;
      }

      const y = Math.random();
      if (y < CHANCES.BIRD_EATS) {
        const selectedFood = selectRandom(feederFoodsForBird)!; // Assert since we checked above that birdFoods is not empty

        feeder.foods = feeder.foods
          .map((feederFood) => {
            if (feederFood.food.id === selectedFood.food.id) {
              return {
                ...feederFood,
                quantity: feederFood.quantity - 1,
              };
            }
            return feederFood;
          })
          .filter((f) => f.quantity > 0); // Remove empty food items

        foodEaten += 1;

        console.log(
          `Bird ate from feeder: ${feederBird.bird.name} ate ${selectedFood.food.name}`
        );

        return;
      }

      const z = Math.random();
      if (z < CHANCES.BIRD_DROPS_FEATHER) {
        const feather = getFeatherByBirdId(feederBird.bird.id);

        const feederFeather: FeederFeather = {
          id: crypto.randomUUID(),
          feather,
          quantity: 1,
          location: {
            x: randomInRange(0.2, 0.8),
            y: randomInRange(0.8, 0.9), // Keep it near the bottom
            rotation: randomInRange(-180, 180),
          },
        };

        feeder.feathers.push(feederFeather);

        feathersDropped += 1;

        console.log(`Bird dropped a feather: ${feather.bird.name}`);
      }
    });
  }

  feeder.lastUpdateMs = Date.now();

  const updatesList = [
    `Processed feeder for ${formatDuration(seconds)}`,
    ...(birdsAppeared > 0 ? [`${birdsAppeared} birds appeared`] : []),
    ...(birdsLeft > 0 ? [`${birdsLeft} birds left`] : []),
    ...(foodEaten > 0 ? [`${foodEaten} food eaten`] : []),
    ...(feathersDropped > 0 ? [`${feathersDropped} feathers dropped`] : []),
  ];

  const updates = updatesList.length > 1 ? updatesList.join("\n") : null;

  return {
    feeder,
    updates,
  };
};
