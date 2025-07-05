import { Bird } from "@/types/bird";
import { getRegionByName, UNKNOWN_REGION } from "./regions";
import { getFoodByName } from "./foods";

export const BIRDS = [
  {
    id: "american-robin",
    name: "American Robin",
    region: getRegionByName("North America"),
    foods: [getFoodByName("Worm")],
    image: "american-robin.png",
    coinsForSpotting: 10,
    sound: "american-robin.m4a",
  },
  {
    id: "mourning-dove",
    name: "Mourning Dove",
    region: getRegionByName("North America"),
    foods: [getFoodByName("Seeds")],
    image: "mourning-dove.png",
    coinsForSpotting: 15,
    sound: "mourning-dove.mp3",
  },
  {
    id: "northern-cardinal",
    name: "Northern Cardinal",
    region: getRegionByName("North America"),
    foods: [getFoodByName("Seeds")],
    image: "northern-cardinal.png",
    coinsForSpotting: 20,
    sound: "northern-cardinal.mp3",
  }
] as Bird[];

export const UNKNOWN_BIRD: Bird = {
  id: "unknown",
  name: "Unknown Bird",
  region: UNKNOWN_REGION,
  foods: [],
  image: "unknown.png",
  coinsForSpotting: 0,
  sound: "unknown.mp3",
};

export const getBirdByName = (name: string): Bird => {
  return BIRDS.find((bird) => bird.name === name) ?? UNKNOWN_BIRD;
};
