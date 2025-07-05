import { Region } from "@/types/region";

export const REGIONS = [
  {
    id: "north-america",
    name: "North America",
    image: "north-america.jpg",
    sound: "north-america.mp3",
  },
] as Region[];

export const UNKNOWN_REGION: Region = {
  id: "unknown",
  name: "Unknown Region",
  image: "unknown.png",
  sound: "unknown.mp3",
};

export const getRegionByName = (name: string): Region => {
  return REGIONS.find((region) => region.name === name) ?? UNKNOWN_REGION;
};
