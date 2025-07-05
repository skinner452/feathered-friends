import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Feeder } from "@/types/feeders";
import { Region } from "@/types/region";
import { Food } from "@/types/food";

export const feedersSlice = createSlice({
  name: "feeders",
  initialState: [] as Feeder[],
  reducers: {
    createFeeder: (state, action: PayloadAction<{ region: Region }>) => {
      const { region } = action.payload;
      const name = `${region.name} Feeder`; // Default name format
      const newFeeder: Feeder = {
        id: crypto.randomUUID(),
        name,
        region,
        foods: [],
        birds: [],
        feathers: [],
        lastUpdateMs: Date.now(),
      };
      state.push(newFeeder);
      return state;
    },
    addFoodToFeeder: (
      state,
      action: PayloadAction<{
        feederId: string;
        food: Food;
        quantity: number;
      }>
    ) => {
      const { feederId, food, quantity } = action.payload;
      const feeder = state.find((f) => f.id === feederId);
      if (feeder) {
        const existingFood = feeder.foods.find((f) => f.food.id === food.id);
        if (existingFood) {
          existingFood.quantity += quantity;
        } else {
          feeder.foods.push({ food, quantity });
        }
      }
      return state;
    },
    removeFeatherFromFeeder: (
      state,
      action: PayloadAction<{
        feederId: string;
        feederFeatherId: string;
      }>
    ) => {
      const { feederId, feederFeatherId } = action.payload;
      const feeder = state.find((f) => f.id === feederId);
      if (feeder) {
        feeder.feathers = feeder.feathers.filter(
          (feather) => feather.id !== feederFeatherId
        );
      }
      return state;
    },
    updateFeeder: (state, action: PayloadAction<{ feeder: Feeder }>) => {
      return state.map((feeder) => {
        // Update the feeder if its ID matches the one in the action payload
        return feeder.id === action.payload.feeder.id
          ? action.payload.feeder
          : feeder;
      });
    },
    spotBird: (
      state,
      action: PayloadAction<{ feederId: string; feederBirdId: string; birdId: string }>
    ) => {
      const { feederId, feederBirdId } = action.payload;
      const feeder = state.find((f) => f.id === feederId);
      if (feeder) {
        const bird = feeder.birds.find(
          (feederBird) => feederBird.id === feederBirdId
        );
        if (bird) {
          bird.isSpotted = true; // Mark the bird as spotted
        }
      }
      return state;
    },
  },
});

export const {
  createFeeder,
  addFoodToFeeder,
  updateFeeder,
  removeFeatherFromFeeder,
  spotBird,
} = feedersSlice.actions;

export const feedersReducer = feedersSlice.reducer;

export const selectFeeders = (state: RootState) => state.feeders;
export const selectFeederById = (state: RootState, id: string) =>
  state.feeders.find((feeder) => feeder.id === id);
