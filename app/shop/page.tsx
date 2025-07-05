"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addCoinsToInventory,
  addFoodToInventory,
  removeCoinsFromInventory,
  removeFeatherFromInventory,
  removeFoodFromInventory,
  selectInventoryCoins,
  selectInventoryFeathers,
  selectInventoryFoods,
} from "@/redux/features/inventory";
import { FOODS } from "@/data/foods";
import { Food, getFoodImageSrc } from "@/types/food";
import { Feather, getFeatherImageSrc, getFeatherName } from "@/types/feather";
import { formatCoins } from "@/utils/formatCoins";
import { StoreItem } from "@/components/StoreItem";
import { selectProgressBirds } from "@/redux/features/progress";

export default function Shop() {
  const inventoryCoins = useAppSelector(selectInventoryCoins);
  const inventoryFoods = useAppSelector(selectInventoryFoods);
  const inventoryFeathers = useAppSelector(selectInventoryFeathers);
  const progressBirds = useAppSelector(selectProgressBirds);

  const dispatch = useAppDispatch();

  const handleBuyFood = (food: Food, quantity: number) => {
    dispatch(removeCoinsFromInventory(food.buyPrice * quantity));
    dispatch(addFoodToInventory({ food, quantity }));
  };

  const handleSellFood = (food: Food, quantity: number) => {
    dispatch(addCoinsToInventory(food.sellPrice * quantity));
    dispatch(removeFoodFromInventory({ id: food.id, quantity }));
  };

  const handleSellFeather = (feather: Feather, quantity: number) => {
    dispatch(addCoinsToInventory(feather.sellPrice * quantity));
    dispatch(removeFeatherFromInventory({ id: feather.id, quantity }));
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-5xl text-center">Shop</p>

      <p className="text-2xl">{formatCoins(inventoryCoins)} coins</p>

      <div className="flex flex-col items-center gap-16">
        {FOODS.map((food, idx) => (
          <StoreItem
            key={idx}
            image={getFoodImageSrc(food)}
            name={food.name}
            amountOwned={
              inventoryFoods.find(
                (inventoryFood) => inventoryFood.food.id === food.id
              )?.quantity ?? 0
            }
            buyPrice={food.buyPrice}
            sellPrice={food.sellPrice}
            onBuy={(quantity) => handleBuyFood(food, quantity)}
            onSell={(quantity) => handleSellFood(food, quantity)}
          />
        ))}

        {inventoryFeathers.map((invFeather, idx) => (
          <StoreItem
            key={idx}
            image={getFeatherImageSrc(invFeather.feather)}
            name={getFeatherName(invFeather.feather, progressBirds)}
            amountOwned={invFeather.quantity}
            sellPrice={invFeather.feather.sellPrice}
            onSell={(quantity) =>
              handleSellFeather(invFeather.feather, quantity)
            }
          />
        ))}
      </div>
    </div>
  );
}
