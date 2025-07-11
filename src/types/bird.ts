export type Bird = {
  id: string;
  name: string;
  regionId: string;
  foodIds: string[];
  variants: {
    id: string;
    name: string;
    image: string;
  }[];
  coinsForSpotting: number;
  sound: string;
};

export const getBirdImageSrc = (bird: Bird, variantId: string) => {
  const variant = bird.variants.find((v) => v.id === variantId);
  if (!variant) return null;
  return `/images/birds/${variant.image}`;
};

export const getBirdSoundSrc = (bird: Bird): string => {
  return `/sounds/birds/${bird.sound}`;
};

export const getBirdVariantIds = (bird: Bird): string[] => {
  return bird.variants.map((v) => v.id);
};
