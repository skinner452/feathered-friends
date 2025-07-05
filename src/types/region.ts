export type Region = {
  id: string;
  name: string;
  image: string;
  sound: string;
};

export const getRegionImageSrc = (region: Region): string => {
  return `/images/regions/${region.image}`;
};

export const getRegionSoundSrc = (region: Region): string => {
  return `/sounds/regions/${region.sound}`;
};
