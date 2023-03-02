import { CarSizesType } from "./CarSizes";

export interface CarInterface {
    id: number;
    size: CarSizesType,
    slotId: number;
    floor: number;
    enterTime: Date;
    exitTime?: Date;
}