import { Bird } from "./bird";
import { ProgressBird } from "./progress";

export type Feather = {
  id: string;
  bird: Bird;
  sellPrice: number;
  image: string;
};

export const getFeatherImageSrc = (feather: Feather): string => {
  return `/images/feathers/${feather.image}`;
};

export const getFeatherName = (
  feather: Feather,
  progressBirds: ProgressBird[]
): string => {
  const progressBird = progressBirds.find((bp) => bp.id === feather.bird.id);
  if (progressBird && progressBird.timesSpotted > 0) {
    return `${feather.bird.name} Feather`;
  } else {
    return `Unidentified Feather`;
  }
};
