"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectProgressBirds } from "@/redux/features/progress";
import { useMemo } from "react";
import { getAllBirds } from "@/data/birds";
import { getBirdImageSrc } from "@/types/bird";
import Image from "next/image";
import { getRegionById } from "@/data/regions";
import { getFoodById } from "@/data/foods";
import { getFeatherByBirdId } from "@/data/feathers";
import { getFeatherImageSrc } from "@/types/feather";

export default function Birds() {
  const progressBirds = useAppSelector(selectProgressBirds);

  const allBirds = useMemo(() => getAllBirds(), []);

  return (
    <div className="flex flex-col gap-8">
      <p className="text-5xl text-center">Birds</p>

      <div className="flex flex-col gap-16">
        {allBirds.map((bird) => {
          const progressBird = progressBirds.find((b) => b.birdId === bird.id);

          const feather = getFeatherByBirdId(bird.id);
          const region = getRegionById(bird.regionId);
          const foods = bird.foodIds.map(foodId => getFoodById(foodId));

          return (
            <div className="flex flex-col gap-2 items-center" key={bird.id}>
              <p className="text-3xl">
                {progressBird?.timesSpotted > 0 ? bird.name : "???"}
              </p>

              <p className="text-xl">Times spotted: {progressBird?.timesSpotted ?? 0}</p>
              <p className="text-xl">Feathers collected: {progressBird?.feathersCollected ?? 0}</p>

              <p className="text-xl">Region: {region.name}</p>
              <p className="text-xl">Foods: {foods.map(food => food.name).join(", ")}</p>

              <div className="flex flex-row justify-center gap-40">
                {bird.variants.map((variant) => {
                  const isSpotted = progressBird?.variantIds.includes(
                    variant.id
                  );

                  return (
                    <div
                      className="flex flex-col items-center gap-2"
                      key={variant.id}
                    >
                      <div className="w-24 h-24 flex items-center justify-center">
                        {isSpotted ? (
                          <Image
                            src={getBirdImageSrc(bird, variant.id)}
                            alt={`${variant.name} ${bird.name}`}
                            width={96}
                            height={96}
                          />
                        ) : (
                          <span className="text-8xl">?</span>
                        )}
                      </div>

                      <p>{variant.name}</p>
                    </div>
                  );
                })}

                <div
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-24 h-24 flex items-center justify-center">
                        {progressBird?.feathersCollected > 0 ? (
                          <Image
                            src={getFeatherImageSrc(feather)}
                            alt={`${bird.name} Feather`}
                            width={96}
                            height={96}
                          />
                        ) : (
                          <span className="text-8xl">?</span>
                        )}
                      </div>

                      <p>Feather</p>
                    </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
