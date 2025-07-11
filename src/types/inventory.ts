export type Inventory = {
  coins: number;
  foods: {
    foodId: string;
    quantity: number;
  }[];
  feathers: {
    featherId: string;
    quantity: number;
  }[];
};
