import { removeFeatherFromFeeder, spotBird } from "@/redux/features/feeders";
import {
  addCoinsToInventory,
  addFeatherToInventory,
} from "@/redux/features/inventory";
import { selectProgressBirds } from "@/redux/features/progress";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBirdImageSrc } from "@/types/bird";
import { getFeatherImageSrc, getFeatherName } from "@/types/feather";
import { Feeder, FeederBird, FeederFeather } from "@/types/feeders";
import { getRegionImageSrc } from "@/types/region";
import { playAudio } from "@/utils/audio";
import { getMiscSoundSrc } from "@/utils/sound";
import Image from "next/image";
import { useCallback } from "react";

type Props = {
  feeder: Feeder;
};

export const FeederFrame = ({ feeder }: Props) => {
  const dispatch = useAppDispatch();

  const progressBirds = useAppSelector(selectProgressBirds);

  const handleBirdClick = (feederBird: FeederBird) => {
    if (feederBird.isSpotted) return;

    playAudio(getMiscSoundSrc("camera-shutter.wav"), 0.5, false);

    dispatch(
      spotBird({
        feederId: feeder.id,
        feederBirdId: feederBird.id,
        birdId: feederBird.bird.id,
      })
    );

    dispatch(addCoinsToInventory(feederBird.bird.coinsForSpotting));
  };

  const handleFeatherClick = useCallback(
    (feederFeather: FeederFeather) => {
      if (!feeder) return;

      playAudio(getMiscSoundSrc("swoop.wav"), 0.5, false);

      dispatch(
        addFeatherToInventory({
          feather: feederFeather.feather,
        })
      );

      dispatch(
        removeFeatherFromFeeder({
          feederId: feeder.id,
          feederFeatherId: feederFeather.id,
        })
      );
    },
    [dispatch, feeder]
  );

  return (
    <div className="relative w-full h-128">
      <Image
        src={getRegionImageSrc(feeder.region)}
        alt={feeder.region.name}
        fill
        className="object-cover"
      />

      {feeder.birds.map((feederBird, idx) => (
        <div
          key={idx}
          className={`absolute ${
            feederBird.isSpotted ? "opacity-100" : "opacity-50 cursor-pointer"
          }`}
          style={{
            left: `${feederBird.location.x * 100}%`,
            top: `${feederBird.location.y * 100}%`,
            transform: `scale(${feederBird.location.scale})`,
            zIndex: feederBird.location.scale + 100, // Bigger birds appear on top
          }}
          onClick={() => handleBirdClick(feederBird)}
        >
          <Image
            src={getBirdImageSrc(feederBird.bird)}
            alt={feederBird.bird.name}
            width={80}
            height={80}
            style={{
              transform: feederBird.isFlipped ? "scaleX(-1)" : undefined,
            }}
          />
        </div>
      ))}

      {feeder.feathers.map((feederFeather, idx) => (
        <div
          key={idx}
          className="absolute cursor-pointer"
          style={{
            left: `${feederFeather.location.x * 100}%`,
            top: `${feederFeather.location.y * 100}%`,
            transform: `rotate(${feederFeather.location.rotation}deg)`,
          }}
          onClick={() => handleFeatherClick(feederFeather)}
        >
          <Image
            src={getFeatherImageSrc(feederFeather.feather)}
            alt={getFeatherName(feederFeather.feather, progressBirds)}
            width={64}
            height={64}
          />
        </div>
      ))}
    </div>
  );
};
