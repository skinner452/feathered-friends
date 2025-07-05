import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Inventory } from "@/types/inventory";
import { Food } from "@/types/food";
import { Feather } from "@/types/feather";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    coins: 100,
    foods: [],
    feathers: [],
  } as Inventory,
  reducers: {
    addCoinsToInventory: (state, action: PayloadAction<number>) => {
      state.coins += action.payload;
      return state;
    },
    removeCoinsFromInventory: (state, action: PayloadAction<number>) => {
      state.coins -= action.payload;
      return state;
    },
    addFoodToInventory: (
      state,
      action: PayloadAction<{ food: Food; quantity: number }>
    ) => {
      const food = state.foods.find(
        (f) => f.food.id === action.payload.food.id
      );
      if (food) {
        food.quantity += action.payload.quantity;
      } else {
        state.foods.push({
          food: action.payload.food,
          quantity: action.payload.quantity,
        });
      }
      return state;
    },
    removeFoodFromInventory: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const food = state.foods.find((f) => f.food.id === action.payload.id);
      if (food) {
        food.quantity -= action.payload.quantity;
        if (food.quantity <= 0) {
          state.foods = state.foods.filter(
            (f) => f.food.id !== action.payload.id
          );
        }
      }
      return state;
    },
    addFeatherToInventory: (
      state,
      action: PayloadAction<{ feather: Feather }>
    ) => {
      const feather = state.feathers.find(
        (f) => f.feather.id === action.payload.feather.id
      );
      if (feather) {
        feather.quantity += 1;
      } else {
        state.feathers.push({
          feather: action.payload.feather,
          quantity: 1,
        });
      }
      return state;
    },
    removeFeatherFromInventory: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const feather = state.feathers.find(
        (f) => f.feather.id === action.payload.id
      );
      if (feather) {
        feather.quantity -= action.payload.quantity;
        if (feather.quantity <= 0) {
          state.feathers = state.feathers.filter(
            (f) => f.feather.id !== action.payload.id
          );
        }
      }
      return state;
    },
  },
});

export const {
  addCoinsToInventory,
  removeCoinsFromInventory,
  addFoodToInventory,
  removeFoodFromInventory,
  addFeatherToInventory,
  removeFeatherFromInventory,
} = inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;

export const selectInventoryCoins = (state: RootState) => state.inventory.coins;
export const selectInventoryFoods = (state: RootState) => state.inventory.foods;
export const selectInventoryFeathers = (state: RootState) =>
  state.inventory.feathers;
