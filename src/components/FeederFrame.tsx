import { getBirdById } from "@/data/birds";
import { getFeatherById } from "@/data/feathers";
import { getRegionById } from "@/data/regions";
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
import { Fragment, useCallback, useMemo } from "react";
import { Tooltip } from "react-tooltip";

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
        birdId: feederBird.birdId,
        variantId: feederBird.variantId,
      })
    );

    const bird = getBirdById(feederBird.birdId);

    dispatch(addCoinsToInventory(bird.coinsForSpotting));
  };

  const handleFeatherClick = useCallback(
    (feederFeather: FeederFeather) => {
      if (!feeder) return;

      playAudio(getMiscSoundSrc("swoop.wav"), 0.5, false);

      dispatch(
        addFeatherToInventory({
          featherId: feederFeather.featherId,
          quantity: 1,
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

  const region = useMemo(() => {
    return getRegionById(feeder.regionId);
  }, [feeder.regionId]);

  return (
    <div className="relative w-full h-128">
      <Image
        src={getRegionImageSrc(region)}
        alt={region.name}
        fill
        className="object-cover"
      />

      {feeder.feathers.map((feederFeather, idx) => {
        const feather = getFeatherById(feederFeather.featherId);

        return (
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
              src={getFeatherImageSrc(feather)}
              alt={getFeatherName(feather, progressBirds)}
              width={64}
              height={64}
              className="hover:saturate-200"
            />
          </div>
        );
      })}

      {feeder.birds.map((feederBird) => {
        const bird = getBirdById(feederBird.birdId);
        const variant = bird.variants.find(
          (v) => v.id === feederBird.variantId
        );

        const tooltipId = `bird-tooltip-${feederBird.id}`;

        return (
          <Fragment key={feederBird.id}>
            <Tooltip id={tooltipId} />
            <div
              className={`absolute ${
                feederBird.isSpotted
                  ? ""
                  : "blur-xs cursor-pointer"
              }`}
              style={{
                left: `${feederBird.location.x * 100}%`,
                top: `${feederBird.location.y * 100}%`,
                transform: `scale(${feederBird.location.scale})`,
                zIndex: feederBird.location.scale + 100, // Bigger birds appear on top
              }}
              onClick={() => handleBirdClick(feederBird)}
              data-tooltip-id={tooltipId}
              data-tooltip-content={`${variant.name} ${bird.name}`}
            >
              <Image
                src={getBirdImageSrc(bird, feederBird.variantId)}
                alt={bird.name}
                width={80}
                height={80}
                style={{
                  transform: feederBird.isFlipped ? "scaleX(-1)" : undefined,
                }}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
