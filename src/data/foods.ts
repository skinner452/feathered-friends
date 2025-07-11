import { Food } from "@/types/food";

const FOODS = [
  {
    id: "worms",
    name: "Worms",
    buyPrice: 4,
    sellPrice: 2,
    image: "worms.png",
  },
  {
    id: "seeds",
    name: "Seeds",
    buyPrice: 6,
    sellPrice: 3,
    image: "seeds.png",
  },
] as Food[];

export const getAllFoods = () => {
  return FOODS;
};

export const getFoodById = (id: string) => {
  return FOODS.find((food) => food.id === id);
};

export const getFoodByName = (name: string) => {
  return FOODS.find((food) => food.name === name);
};
