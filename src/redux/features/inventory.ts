import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Inventory } from "@/types/inventory";

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
      action: PayloadAction<{ foodId: string; quantity: number }>
    ) => {
      const { foodId, quantity } = action.payload;

      const existingFood = state.foods.find(
        (invFood) => invFood.foodId === foodId
      );
      if (existingFood) {
        existingFood.quantity += quantity;
      } else {
        state.foods.push({
          foodId,
          quantity,
        });
      }
      return state;
    },
    removeFoodFromInventory: (
      state,
      action: PayloadAction<{ foodId: string; quantity: number }>
    ) => {
      const { foodId, quantity } = action.payload;

      const existingFood = state.foods.find(
        (invFood) => invFood.foodId === foodId
      );
      if (existingFood) {
        existingFood.quantity -= quantity;
        if (existingFood.quantity <= 0) {
          // Zero (or negative) quantity remaining, remove from inventory
          state.foods = state.foods.filter(
            (invFood) => invFood.foodId !== foodId
          );
        }
      }
      return state;
    },
    addFeatherToInventory: (
      state,
      action: PayloadAction<{ featherId: string; quantity: number }>
    ) => {
      const { featherId, quantity } = action.payload;

      const existingFeather = state.feathers.find(
        (invFeather) => invFeather.featherId === featherId
      );
      if (existingFeather) {
        existingFeather.quantity += quantity;
      } else {
        state.feathers.push({
          featherId,
          quantity,
        });
      }
      return state;
    },
    removeFeatherFromInventory: (
      state,
      action: PayloadAction<{ featherId: string; quantity: number }>
    ) => {
      const { featherId, quantity } = action.payload;

      const existingFeather = state.feathers.find(
        (invFeather) => invFeather.featherId === featherId
      );
      if (existingFeather) {
        existingFeather.quantity -= quantity;
        if (existingFeather.quantity <= 0) {
          state.feathers = state.feathers.filter(
            (invFeather) => invFeather.featherId !== featherId
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
