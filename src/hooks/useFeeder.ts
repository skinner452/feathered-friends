import {
  addFoodToFeeder,
  selectFeederById,
  updateFeeder,
} from "@/redux/features/feeders";
import { removeFoodFromInventory } from "@/redux/features/inventory";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Food } from "@/types/food";
import { processFeeder } from "@/utils/processFeeder";
import { useCallback, useEffect, useState } from "react";
import { useFeederSounds } from "./useFeederSounds";

export const useFeeder = (feederId: string) => {
  const [isLive, setIsLive] = useState(false);

  const dispatch = useAppDispatch();
  const feeder = useAppSelector((state) => selectFeederById(state, feederId));

  useFeederSounds(feeder);

  useEffect(() => {
    // Simulation: Process the feeder once when the component mounts
    if (isLive || !feeder) return;

    const simulate = async () => {
      // Calculate the time since the last update in seconds
      const msSinceUpdate = Date.now() - feeder.lastUpdateMs;
      const secondsSinceUpdate = Math.floor(msSinceUpdate / 1000);

      // Simulate the feeder processing for the seconds since the last update
      const result = processFeeder(feeder, secondsSinceUpdate);

      if (result.updates) alert(result.updates);

      dispatch(updateFeeder({ feeder: result.feeder }));
      setIsLive(true);
    };

    simulate();
  }, [dispatch, feeder, isLive]);

  useEffect(() => {
    // Live: Process the feeder every second
    if (!feeder || !isLive) return;

    // Each second, process the feeder chances
    const interval = setInterval(() => {
      const result = processFeeder(feeder, 1);
      dispatch(updateFeeder({ feeder: result.feeder }));
    }, 1000);

    // Cleanup when the component unmounts or feeder changes
    return () => clearInterval(interval);
  }, [feeder, dispatch, isLive]);

  const addFood = useCallback(
    (food: Food, quantity: number) => {
      if (!feeder) return;

      dispatch(
        addFoodToFeeder({
          feederId: feeder.id,
          food,
          quantity,
        })
      );

      dispatch(
        removeFoodFromInventory({
          id: food.id,
          quantity,
        })
      );
    },
    [dispatch, feeder]
  );

  return {
    feeder,
    addFood,
  };
};
