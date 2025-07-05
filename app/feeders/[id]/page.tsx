"use client";

import { Button } from "@/components/Button";
import { FeederFrame } from "@/components/FeederFrame";
import { SETTINGS } from "@/config/settings";
import { useFeeder } from "@/hooks/useFeeder";
import {
  selectInventoryCoins,
  selectInventoryFoods,
} from "@/redux/features/inventory";
import { useAppSelector } from "@/redux/hooks";
import { getFeederFoodCount } from "@/types/feeders";
import { formatCoins } from "@/utils/formatCoins";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function FeederDetails() {
  const { id } = useParams();

  const { feeder, addFood } = useFeeder(id as string);

  const inventoryCoins = useAppSelector(selectInventoryCoins);
  const inventoryFoods = useAppSelector(selectInventoryFoods);

  const feederFoodCount = useMemo(() => {
    return getFeederFoodCount(feeder);
  }, [feeder]);

  if (!feeder) {
    return <p className="text-2xl text-center">Feeder not found</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl">{feeder.name}</p>
      <p className="text-2xl">Region: {feeder.region.name}</p>

      <FeederFrame feeder={feeder} />

      <p className="text-2xl">Coins: {formatCoins(inventoryCoins)}</p>

      <div className="flex flex-col items-center gap-2">
        <p className="text-3xl">Food in feeder ({feederFoodCount} / {SETTINGS.MAX_FOOD_PER_FEEDER})</p>
        <p></p>
        {feeder.foods.length > 0 ? (
          feeder.foods.map(({ food, quantity }) => {
            return (
              <p key={food.id} className="text-lg">
                {food.name} x{quantity}
              </p>
            );
          })
        ) : (
          <p className="text-lg">Empty</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-4xl">Food in inventory</p>
        {inventoryFoods.length > 0 ? (
          inventoryFoods.map(({ food, quantity }) => {
            return (
              <div key={food.id} className="flex items-center gap-4">
                <p className="text-lg">
                  {food.name} x{quantity}
                </p>
                <Button
                  text="Add 1"
                  onClick={() => addFood(food, 1)}
                  color="green"
                  size="sm"
                  disabled={quantity < 1 || feederFoodCount + 1 > SETTINGS.MAX_FOOD_PER_FEEDER}
                />
                <Button
                  text="Add 5"
                  onClick={() => addFood(food, 5)}
                  color="green"
                  size="sm"
                  disabled={quantity < 5 || feederFoodCount + 5 > SETTINGS.MAX_FOOD_PER_FEEDER}
                />
                <Button
                  text="Add 10"
                  onClick={() => addFood(food, 10)}
                  color="green"
                  size="sm"
                  disabled={quantity < 10 || feederFoodCount + 10 > SETTINGS.MAX_FOOD_PER_FEEDER}
                />
              </div>
            );
          })
        ) : (
          <p className="text-lg">Empty</p>
        )}
      </div>
    </div>
  );
}
