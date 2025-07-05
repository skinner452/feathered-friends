import { selectInventoryCoins } from "@/redux/features/inventory";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { Button } from "./Button";

type Props = {
  image: string;
  name: string;
  amountOwned: number;
  buyPrice?: number;
  sellPrice?: number;
  onBuy?: (quantity: number) => void;
  onSell?: (quantity: number) => void;
};

export const StoreItem = (props: Props) => {
  const inventoryCoins = useAppSelector(selectInventoryCoins);

  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-col items-center gap-2 w-32">
        <Image src={props.image} alt={props.name} width={96} height={96} />
        <div className="flex flex-col items-center">
          <p className="text-xl text-center">{props.name}</p>
          <p className="text-xs">Owned: {props.amountOwned}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {props.buyPrice ? (
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-col items-center w-24">
              <p className="text-2xl">Buy</p>
              <p className="text-sm">{props.buyPrice} coins</p>
            </div>
            {[1, 5, 10].map((quantity) => (
              <Button
                key={quantity}
                text={`x${quantity}`}
                color="green"
                onClick={() => props.onBuy(quantity)}
                size="md"
                disabled={props.buyPrice * quantity > inventoryCoins}
              />
            ))}
          </div>
        ) : null}

        {props.sellPrice ? (
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-col items-center w-24">
              <p className="text-2xl">Sell</p>
              <p className="text-sm">{props.sellPrice} coins</p>
            </div>
            {[1, 5, 10].map((quantity) => (
              <Button
                key={quantity}
                text={`x${quantity}`}
                color="orange"
                onClick={() => props.onSell(quantity)}
                size="md"
                disabled={quantity > props.amountOwned}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
