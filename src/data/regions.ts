import { Region } from "@/types/region";

const REGIONS = [
  {
    id: "north-america",
    name: "North America",
    image: "north-america.jpg",
    sound: "north-america.mp3",
  },
] as Region[];

export const getAllRegions = () => {
  return REGIONS;
};

export const getRegionById = (id: string) => {
  return REGIONS.find((region) => region.id === id);
};

export const getRegionByName = (name: string) => {
  return REGIONS.find((region) => region.name === name);
};
