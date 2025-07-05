import { Food } from "@/types/food";

export const FOODS = [
  {
    id: "worm",
    name: "Worm",
    buyPrice: 4,
    sellPrice: 2,
    image: "worm.png",
  },
  {
    id: "seeds",
    name: "Seeds",
    buyPrice: 6,
    sellPrice: 3,
    image: "seeds.png",
  },
] as Food[];

export const getFoodByName = (name: string): Food => {
  return (
    FOODS.find((food) => food.name === name) ?? {
      id: "unknown",
      name: "Unknown Food",
      buyPrice: 0,
      sellPrice: 0,
      image: "unknown.png",
    }
  );
};
