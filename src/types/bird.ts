import { Food } from "./food";
import { Region } from "./region";

export type Bird = {
  id: string;
  name: string;
  region: Region;
  foods: Food[];
  image: string;
  coinsForSpotting: number;
  sound: string;
};

export const getBirdImageSrc = (bird: Bird): string => {
  return `/images/birds/${bird.image}`;
};

export const getBirdSoundSrc = (bird: Bird): string => {
  return `/sounds/birds/${bird.sound}`;
};
