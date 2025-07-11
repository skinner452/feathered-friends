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
import { Food, getFoodImageSrc } from "@/types/food";
import { Feather, getFeatherImageSrc, getFeatherName } from "@/types/feather";
import { formatCoins } from "@/utils/formatCoins";
import { StoreItem } from "@/components/StoreItem";
import { selectProgressBirds } from "@/redux/features/progress";
import { getAllFoods } from "@/data/foods";
import { getFeatherById } from "@/data/feathers";

export default function Shop() {
  const inventoryCoins = useAppSelector(selectInventoryCoins);
  const inventoryFoods = useAppSelector(selectInventoryFoods);
  const inventoryFeathers = useAppSelector(selectInventoryFeathers);
  const progressBirds = useAppSelector(selectProgressBirds);

  const dispatch = useAppDispatch();

  const handleBuyFood = (food: Food, quantity: number) => {
    dispatch(removeCoinsFromInventory(food.buyPrice * quantity));
    dispatch(addFoodToInventory({ foodId: food.id, quantity }));
  };

  const handleSellFood = (food: Food, quantity: number) => {
    dispatch(addCoinsToInventory(food.sellPrice * quantity));
    dispatch(removeFoodFromInventory({ foodId: food.id, quantity }));
  };

  const handleSellFeather = (feather: Feather, quantity: number) => {
    dispatch(addCoinsToInventory(feather.sellPrice * quantity));
    dispatch(removeFeatherFromInventory({ featherId: feather.id, quantity }));
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-5xl text-center">Shop</p>

      <p className="text-2xl">{formatCoins(inventoryCoins)} coins</p>

      <div className="flex flex-col items-center gap-16">
        {getAllFoods().map((food, idx) => (
          <StoreItem
            key={idx}
            image={getFoodImageSrc(food)}
            name={food.name}
            amountOwned={
              inventoryFoods.find(
                (inventoryFood) => inventoryFood.foodId === food.id
              )?.quantity ?? 0
            }
            buyPrice={food.buyPrice}
            sellPrice={food.sellPrice}
            onBuy={(quantity) => handleBuyFood(food, quantity)}
            onSell={(quantity) => handleSellFood(food, quantity)}
          />
        ))}

        {inventoryFeathers.map((invFeather, idx) => {
          const feather = getFeatherById(invFeather.featherId);

          return (
            <StoreItem
              key={idx}
              image={getFeatherImageSrc(feather)}
              name={getFeatherName(feather, progressBirds)}
              amountOwned={invFeather.quantity}
              sellPrice={feather.sellPrice}
              onSell={(quantity) => handleSellFeather(feather, quantity)}
            />
          );
        })}
      </div>
    </div>
  );
}
