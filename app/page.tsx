"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectInventoryCoins } from "@/redux/features/inventory";
import { formatCoins } from "@/utils/formatCoins";

export default function Home() {
  const router = useRouter();

  const inventoryCoins = useAppSelector(selectInventoryCoins);

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-5xl text-center">Feathered Friends</p>

      <p className="text-2xl">{formatCoins(inventoryCoins)} coins</p>

      <Button
        text="Feeders"
        onClick={() => router.push("/feeders")}
        color="green"
      />
      <Button
        text="Shop"
        onClick={() => router.push("/shop")}
        color="orange"
      />
    </div>
  );
}
