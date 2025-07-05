export type Food = {
  id: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  image: string;
};

export const getFoodImageSrc = (food: Food): string => {
  return `/images/foods/${food.image}`;
};
