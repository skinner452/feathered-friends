import { Feather } from "@/types/feather";
import { getBirdByName, UNKNOWN_BIRD } from "./birds";

export const FEATHERS = [
  {
    id: "american-robin",
    bird: getBirdByName("American Robin"),
    sellPrice: 10,
    image: "american-robin.png",
  },
  {
    id: "mourning-dove",
    bird: getBirdByName("Mourning Dove"),
    sellPrice: 15,
    image: "mourning-dove.png",
  },
  {
    id: "northern-cardinal",
    bird: getBirdByName("Northern Cardinal"),
    sellPrice: 20,
    image: "northern-cardinal.png",
  },
] as Feather[];

export const UNKNOWN_FEATHER: Feather = {
  id: "unknown",
  bird: UNKNOWN_BIRD,
  sellPrice: 0,
  image: "unknown.png",
};

export const getFeatherByBirdId = (birdId: string): Feather => {
  return (
    FEATHERS.find((feather) => feather.bird.id === birdId) ?? UNKNOWN_FEATHER
  );
};
