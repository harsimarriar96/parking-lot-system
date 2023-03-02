export interface ParkingLotInterface {
    id: number;
    floors: number;
    slots: number;
    floorSize: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
    }
}
