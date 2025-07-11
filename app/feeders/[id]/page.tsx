"use client";

import { Button } from "@/components/Button";
import { FeederFrame } from "@/components/FeederFrame";
import { SETTINGS } from "@/config/settings";
import { getAllFoods } from "@/data/foods";
import { getRegionById } from "@/data/regions";
import { useFeeder } from "@/hooks/useFeeder";
import {
  selectInventoryCoins,
  selectInventoryFoods,
} from "@/redux/features/inventory";
import { useAppSelector } from "@/redux/hooks";
import { getFeederFoodCount } from "@/types/feeders";
import { getFoodImageSrc } from "@/types/food";
import { formatCoins } from "@/utils/formatCoins";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function FeederDetails() {
  const { id } = useParams();

  const { feeder, addFood, removeFood } = useFeeder(id as string);

  const inventoryCoins = useAppSelector(selectInventoryCoins);
  const inventoryFoods = useAppSelector(selectInventoryFoods);

  const feederFoodCount = useMemo(() => {
    if (!feeder) return 0;
    return getFeederFoodCount(feeder);
  }, [feeder]);

  const region = useMemo(() => {
    if (!feeder?.regionId) return null;
    return getRegionById(feeder.regionId);
  }, [feeder?.regionId]);

  const foods = useMemo(() => getAllFoods(), []);

  if (!feeder) {
    return <p className="text-2xl text-center">Feeder not found</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl">{feeder.name}</p>
      <p className="text-2xl">Region: {region.name}</p>

      <FeederFrame feeder={feeder} />

      <p className="text-2xl">Coins: {formatCoins(inventoryCoins)}</p>

      <p className="text-3xl">
        Food in feeder ({feederFoodCount} / {SETTINGS.MAX_FOOD_PER_FEEDER})
      </p>

      <div className="flex flex-col items-center gap-8">
        {foods.map((food) => {
          const amountAdded =
            feeder.foods.find((f) => f.foodId === food.id)?.quantity ?? 0;

          const amountOwned =
            inventoryFoods.find((f) => f.foodId === food.id)?.quantity ?? 0;

          return (
            <div key={food.id} className="flex flex-row items-center gap-4">
              <div className="flex flex-col items-center gap-2 w-32">
                <Image
                  src={getFoodImageSrc(food)}
                  alt={food.name}
                  width={96}
                  height={96}
                />
                <div className="flex flex-col items-center">
                  <p className="text-xl text-center">{food.name}</p>
                  <p className="text-xs">Added: {amountAdded}</p>
                  <p className="text-xs">Owned: {amountOwned}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-col items-center w-24">
                    <p className="text-2xl">Add</p>
                  </div>
                  {[1, 5, 10].map((quantity) => (
                    <Button
                      key={quantity}
                      text={`x${quantity}`}
                      color="green"
                      onClick={() => addFood(food.id, quantity)}
                      size="md"
                      disabled={
                        quantity > amountOwned ||
                        feederFoodCount + quantity >
                          SETTINGS.MAX_FOOD_PER_FEEDER
                      }
                    />
                  ))}
                </div>

                <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-col items-center w-24">
                    <p className="text-2xl">Remove</p>
                  </div>
                  {[1, 5, 10].map((quantity) => (
                    <Button
                      key={quantity}
                      text={`x${quantity}`}
                      color="orange"
                      onClick={() => removeFood(food.id, quantity)}
                      size="md"
                      disabled={quantity > amountAdded}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
