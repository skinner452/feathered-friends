export const playAudio = (
  file: string,
  volume: number,
  loop: boolean
): HTMLAudioElement => {
  const audio = new Audio(file);
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
  audio.volume = volume;
  audio.loop = loop;
  return audio;
};

export const stopAudio = (audio: HTMLAudioElement) => {
  audio.pause();
  audio.currentTime = 0;
};
