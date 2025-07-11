import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Progress } from "@/types/progress";
import {
  addCoinsToInventory,
  addFeatherToInventory,
  removeCoinsFromInventory,
} from "./inventory";
import { spotBird } from "./feeders";
import { getFeatherById } from "@/data/feathers";

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
        const { featherId, quantity } = action.payload;

        const feather = getFeatherById(featherId);

        const existingBird = state.birds.find(
          (progressBird) => progressBird.birdId === feather.birdId
        );
        if (existingBird) {
          existingBird.feathersCollected += quantity;
        } else {
          state.birds.push({
            birdId: feather.birdId,
            variantIds: [],
            timesSpotted: 0,
            feathersCollected: quantity,
          });
        }
      })
      .addCase(spotBird, (state, action) => {
        const { birdId, variantId } = action.payload;

        const existingBird = state.birds.find(
          (progressBird) => progressBird.birdId === birdId
        );
        if (existingBird) {
          existingBird.timesSpotted += 1;
          if (!existingBird.variantIds.includes(variantId)) {
            existingBird.variantIds.push(variantId);
          }
        } else {
          state.birds.push({
            birdId,
            variantIds: [variantId],
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
