import { CHANCES } from "@/config/chances";
import { getBirdSoundSrc } from "@/types/bird";
import { Feeder, getFeederFoodCount } from "@/types/feeders";
import { getRegionSoundSrc } from "@/types/region";
import { playAudio, stopAudio } from "@/utils/audio";
import { getMiscSoundSrc } from "@/utils/sound";
import { useEffect, useRef } from "react";

export const useFeederSounds = (feeder: Feeder) => {
  const birdCount = useRef<number | null>(null);
  const foodCount = useRef<number | null>(null);

  const activeSounds = useRef<string[]>([]);

  useEffect(() => {
    // REGION SOUNDS
    const regionSound = playAudio(getRegionSoundSrc(feeder.region), 0.3, true);
    return () => stopAudio(regionSound);
  }, [feeder.region]);

  useEffect(() => {
    // BIRD ARRIVAL/DEPARTURE SOUNDS

    if (birdCount.current === null) {
      // Initialize bird count
      birdCount.current = feeder.birds.length;
      return;
    }

    const birdDiff = feeder.birds.length - birdCount.current;
    if (birdDiff === 0) return; // No new birds, no sound

    for (let i = 0; i < birdDiff; i++) {
      const delay = Math.random() * 1000; // Random delay between 0 and 1000ms to avoid overlapping sounds
      setTimeout(() => {
        playAudio(getMiscSoundSrc("wing-flap.wav"), 0.5, false);
      }, delay);
    }

    // Update the bird count
    birdCount.current = feeder.birds.length;
  }, [feeder.birds]);

  useEffect(() => {
    // BIRD SOUNDS
    const playBirdSounds = async () => {
      feeder.birds.forEach((feederBird) => {
        const sound = getBirdSoundSrc(feederBird.bird);
        if (activeSounds.current.includes(sound)) return; // Already playing this bird's sound

        const x = Math.random();
        if (x > CHANCES.BIRD_CALLS) return; // Skip if chance is not met

        activeSounds.current.push(sound);
        const audio = playAudio(sound, 0.5, false);

        audio.addEventListener("ended", () => {
          // Remove from active sounds when the audio ends
          stopAudio(audio);
          activeSounds.current = activeSounds.current.filter(
            (id) => id !== sound
          );
        });
      }, []);
    };

    const interval = setInterval(playBirdSounds, 1000); // Attempt bird sounds every second
    return () => clearInterval(interval);
  }, [feeder.birds]);

  useEffect(() => {
    // BIRD EATING SOUNDS

    const newFoodCount = getFeederFoodCount(feeder);

    if (foodCount.current === null) {
      // Initialize food count
      foodCount.current = newFoodCount;
      return;
    }

    const foodDiff = newFoodCount - foodCount.current;
    if (foodDiff === 0) {
      // No change in food count, no sound
    } else if (foodDiff > 0) {
      // New food added, no sound for this yet
    } else if (foodDiff < 0) {
      // Food removed, play eating sounds
      const removedFoodCount = foodDiff * -1; // Convert to positive count
      for (let i = 0; i < removedFoodCount; i++) {
        const delay = Math.random() * 1000; // Random delay between 0 and 1000ms to avoid overlapping sounds
        setTimeout(() => {
          playAudio(getMiscSoundSrc("eating.m4a"), 0.5, false);
        }, delay);
      }
    }

    // Update the food count
    foodCount.current = newFoodCount;
  }, [feeder]);
};
