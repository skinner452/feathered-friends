import { Bird } from "@/types/bird";
import { getRegionByName } from "./regions";
import { getFoodByName } from "./foods";

const BIRDS = [
  {
    id: "american-robin",
    name: "American Robin",
    regionId: getRegionByName("North America").id,
    foodIds: [getFoodByName("Worms").id],
    variants: [
      {
        id: "male",
        name: "Male",
        image: "american-robin/male.png",
      },
      {
        id: "female",
        name: "Female",
        image: "american-robin/female.png",
      },
    ],
    coinsForSpotting: 10,
    sound: "american-robin.m4a",
  },
  {
    id: "mourning-dove",
    name: "Mourning Dove",
    regionId: getRegionByName("North America").id,
    foodIds: [getFoodByName("Seeds").id],
    variants: [
      {
        id: "male",
        name: "Male",
        image: "mourning-dove/male.png",
      },
      {
        id: "female",
        name: "Female",
        image: "mourning-dove/female.png",
      },
    ],
    coinsForSpotting: 15,
    sound: "mourning-dove.mp3",
  },
  {
    id: "northern-cardinal",
    name: "Northern Cardinal",
    regionId: getRegionByName("North America").id,
    foodIds: [getFoodByName("Seeds").id],
    variants: [
      {
        id: "male",
        name: "Male",
        image: "northern-cardinal/male.png",
      },
      {
        id: "female",
        name: "Female",
        image: "northern-cardinal/female.png",
      },
    ],
    coinsForSpotting: 20,
    sound: "northern-cardinal.mp3",
  },
] as Bird[];

export const getAllBirds = () => {
  return BIRDS;
};

export const getBirdById = (id: string) => {
  return BIRDS.find((bird) => bird.id === id);
};

export const getBirdByName = (name: string) => {
  return BIRDS.find((bird) => bird.name === name);
};

export const getBirdsByRegionIdAndFoodId = (
  regionId: string,
  foodId: string
) => {
  return BIRDS.filter(
    (bird) =>
      bird.regionId === regionId &&
      bird.foodIds.some((birdFoodId) => birdFoodId === foodId)
  );
};
