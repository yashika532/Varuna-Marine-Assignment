import { TARGET_INTENSITY_2025, MJ_PER_TONNE } from "../../shared/constants";
export function computeCB(ghg:number, fuel:number){
  return (TARGET_INTENSITY_2025 - ghg) * fuel * MJ_PER_TONNE;
}
