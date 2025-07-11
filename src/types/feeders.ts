export type FeederFood = {
  foodId: string;
  quantity: number;
};

export type FeederFeather = {
  id: string;
  featherId: string;
  quantity: number;
  location: {
    x: number;
    y: number;
    rotation: number;
  };
};

export type FeederBird = {
  id: string;
  birdId: string;
  variantId: string;
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
  regionId: string;
  foods: FeederFood[];
  birds: FeederBird[];
  feathers: FeederFeather[];
  lastUpdateMs: number;
};

export const deepCloneFeeder = (feeder: Feeder): Feeder => {
  return {
    id: feeder.id,
    name: feeder.name,
    regionId: feeder.regionId,
    foods: feeder.foods.map((feederFood) => ({
      foodId: feederFood.foodId,
      quantity: feederFood.quantity,
    })),
    birds: feeder.birds.map((feederBird) => ({
      id: feederBird.id,
      birdId: feederBird.birdId,
      variantId: feederBird.variantId,
      location: { ...feederBird.location },
      isFlipped: feederBird.isFlipped,
      isSpotted: feederBird.isSpotted,
    })),
    feathers: feeder.feathers.map((feederFeather) => ({
      id: feederFeather.id,
      featherId: feederFeather.featherId,
      quantity: feederFeather.quantity,
      location: { ...feederFeather.location },
    })),
    lastUpdateMs: feeder.lastUpdateMs,
  };
};

export const getFeederFoodCount = (feeder: Feeder): number => {
  return feeder.foods.reduce((total, { quantity }) => total + quantity, 0);
};
