import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Progress } from "@/types/progress";
import {
  addCoinsToInventory,
  addFeatherToInventory,
  removeCoinsFromInventory,
} from "./inventory";
import { spotBird } from "./feeders";

export const progressSlice = createSlice({
  name: "progress",
  initialState: {
    startedOnMs: Date.now(),
    coinsMade: 0,
    coinsSpent: 0,
    birds: [],
  } as Progress,
  reducers: {},
  extraReducers: (builder) => {
    // Use extraReduces to handle actions from other slices
    // This allows us to keep the progress slice decoupled from inventory and feeders
    builder
      .addCase(addCoinsToInventory, (state, action) => {
        state.coinsMade += action.payload;
      })
      .addCase(removeCoinsFromInventory, (state, action) => {
        state.coinsSpent += action.payload;
      })
      .addCase(addFeatherToInventory, (state, action) => {
        const birdId = action.payload.feather.bird.id;
        const bird = state.birds.find((b) => b.id === birdId);
        if (bird) {
          bird.feathersCollected += 1;
        } else {
          state.birds.push({
            id: birdId,
            timesSpotted: 0,
            feathersCollected: 1,
          });
        }
      })
      .addCase(spotBird, (state, action) => {
        const birdId = action.payload.birdId;
        const bird = state.birds.find((b) => b.id === birdId);
        if (bird) {
          bird.timesSpotted += 1;
        } else {
          state.birds.push({
            id: birdId,
            timesSpotted: 1,
            feathersCollected: 0,
          });
        }
      });
  },
});

export const {} = progressSlice.actions;

export const progressReducer = progressSlice.reducer;

export const selectProgressBirds = (state: RootState) => state.progress.birds;
