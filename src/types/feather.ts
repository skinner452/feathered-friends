import { getBirdById } from "@/data/birds";
import { ProgressBird } from "./progress";

export type Feather = {
  id: string;
  birdId: string;
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
  const progressBird = progressBirds.find(
    (progressBird) => progressBird.birdId === feather.birdId
  );
  if (progressBird && progressBird.timesSpotted > 0) {
    const bird = getBirdById(feather.birdId);
    return `${bird.name} Feather`;
  } else {
    return `Unidentified Feather`;
  }
};
