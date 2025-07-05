import { Feather } from "./feather";
import { Food } from "./food";

export type Inventory = {
  coins: number;
  foods: {
    food: Food;
    quantity: number;
  }[];
  feathers: {
    feather: Feather;
    quantity: number;
  }[];
};
