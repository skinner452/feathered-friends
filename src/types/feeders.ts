import { Bird } from "./bird";
import { Feather } from "./feather";
import { Food } from "./food";
import { Region } from "./region";

export type FeederFood = {
  food: Food;
  quantity: number;
};

export type FeederFeather = {
  id: string;
  feather: Feather;
  quantity: number;
  location: {
    x: number;
    y: number;
    rotation: number;
  };
};

export type FeederBird = {
  id: string;
  bird: Bird;
  location: {
    x: number;
    y: number;
    scale: number;
  };
  isFlipped: boolean;
  isSpotted: boolean;
};

export type Feeder = {
  id: string;
  name: string;
  region: Region;
  foods: FeederFood[];
  birds: FeederBird[];
  feathers: FeederFeather[];
  lastUpdateMs: number;
};

export const deepCloneFeeder = (feeder: Feeder): Feeder => {
  return {
    id: feeder.id,
    name: feeder.name,
    region: feeder.region,
    foods: feeder.foods.map((feederFood) => ({
      food: feederFood.food, // We don't want to mutate food objects
      quantity: feederFood.quantity,
    })),
    birds: feeder.birds.map((feederBird) => ({
      id: feederBird.id,
      bird: feederBird.bird, // We don't want to mutate bird objects
      location: { ...feederBird.location },
      isFlipped: feederBird.isFlipped,
      isSpotted: feederBird.isSpotted,
    })),
    feathers: feeder.feathers.map((feederFeather) => ({
      id: feederFeather.id,
      feather: feederFeather.feather, // We don't want to mutate feather objects
      quantity: feederFeather.quantity,
      location: { ...feederFeather.location },
    })),
    lastUpdateMs: feeder.lastUpdateMs,
  };
};

export const getFeederFoodCount = (feeder: Feeder): number => {
  return feeder.foods.reduce((total, { quantity }) => total + quantity, 0);
};
