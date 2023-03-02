import { CarSizes, CarSizesType } from "./CarSizes";

export interface SlotInterface {
    id: number;
    floor: number;
    isOccupied: boolean;
    lotId: number;
    size: CarSizesType;
}