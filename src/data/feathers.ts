import { Feather } from "@/types/feather";
import { getBirdByName } from "./birds";

const FEATHERS = [
  {
    id: "american-robin",
    birdId: getBirdByName("American Robin").id,
    sellPrice: 10,
    image: "american-robin.png",
  },
  {
    id: "mourning-dove",
    birdId: getBirdByName("Mourning Dove").id,
    sellPrice: 15,
    image: "mourning-dove.png",
  },
  {
    id: "northern-cardinal",
    birdId: getBirdByName("Northern Cardinal").id,
    sellPrice: 20,
    image: "northern-cardinal.png",
  },
] as Feather[];

export const getFeatherById = (id: string) => {
  return FEATHERS.find((feather) => feather.id === id);
};

export const getFeatherByBirdId = (birdId: string) => {
  return FEATHERS.find((feather) => feather.birdId === birdId);
};
