export type ProgressBird = {
  birdId: string;
  variantIds: string[];
  timesSpotted: number;
  feathersCollected: number;
};

export type Progress = {
  startedOnMs: number;
  coinsMade: number;
  coinsSpent: number;
  birds: ProgressBird[];
};
