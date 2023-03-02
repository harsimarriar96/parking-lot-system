import { Button } from "@/components/Button";
import { Input } from "@/components/Input"
import { CarSizes } from "@/types/CarSizes";
import { SlotInterface } from "@/types/Slot";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";

const AddParking = () => {
    const router = useRouter();

    const [floors, setFloors] = useState<number>(0);
    const [floorSizeSm, setFloorSizeSm] = useState<number>(0);
    const [floorSizeMd, setFloorSizeMd] = useState<number>(0);
    const [floorSizeLg, setFloorSizeLg] = useState<number>(0);
    const [floorSizeXl, setFloorSizeXl] = useState<number>(0);

    const getTotalSlots = () => {
        return (Number(floorSizeSm) + Number(floorSizeMd) + Number(floorSizeLg) + Number(floorSizeXl)) * Number(floors);
    }

    const onClickAdd = async () =>{ 
        toast(`Added a new parking with ${floors} floors with total ${getTotalSlots()} slots.`)

        const lastParkingLotId: string | null = await localStorage.getItem('lastParkingLotId');
        const lastSlotId: string | null = await localStorage.getItem('lastSlotId');
        const currentParkingLots: SlotInterface[] = JSON.parse(await localStorage.getItem('parkingLots') || '[]');
        const currentSlots: SlotInterface[] = JSON.parse(await localStorage.getItem('slots') || '[]');

        const lotId: number = Number(lastParkingLotId) + 1;
        let slotId: number = Number(lastSlotId);


        const newParkingLot = {
            id: lotId,
            slots: getTotalSlots(),
            floors,
            floorSize: {
                sm: floorSizeSm,
                md: floorSizeMd,
                lg: floorSizeLg,
                xl: floorSizeXl
            }
        }

        const newSlots: SlotInterface[] = []
        for(let floor = 0; floor < floors; floor++) {
            for(let smSlot = 0; smSlot < floorSizeSm; smSlot++) {
                newSlots.push({id: ++slotId, lotId, size: CarSizes.SM, isOccupied: false, floor});
            }

            for(let mdSlot = 0; mdSlot < floorSizeMd; mdSlot++) {
                newSlots.push({id: ++slotId, lotId, size: CarSizes.MD, isOccupied: false, floor});
            }

            for(let lgSlot = 0; lgSlot < floorSizeLg; lgSlot++) {
                newSlots.push({id: ++slotId, lotId, size: CarSizes.LG, isOccupied: false, floor});
            }

            for(let xlSlot = 0; xlSlot < floorSizeXl; xlSlot++) {
                newSlots.push({id: ++slotId, lotId, size: CarSizes.XL, isOccupied: false, floor});
            }
        }

        await localStorage.setItem('parkingLots', JSON.stringify(currentParkingLots.length ? [...currentParkingLots, newParkingLot] : [newParkingLot]));
        await localStorage.setItem('slots', JSON.stringify(currentSlots.length ? [...currentSlots, ...newSlots] : [...newSlots]))
        await localStorage.setItem('lastParkingLotId', JSON.stringify(lotId));
        await localStorage.setItem('lastSlotId', JSON.stringify(slotId));
    }

    return <>
        <div className="flex flex-col gap-4">

            <h1 className="mb-10 text-5xl">Add a new parking lot</h1>

            <p>Floors</p>
            <Input placeholder="Floors" type="number" value={floors} onChange={(e: ChangeEvent<HTMLFormElement>) => setFloors(e.target.value)} />
            
            <p className="mt-4">Floor Size (Small)</p>
            <Input placeholder="Floor Size (Small)" value={floorSizeSm} onChange={(e: ChangeEvent<HTMLFormElement>) => setFloorSizeSm(e.target.value)}  />
            
            <p className="mt-4">Floor Size (Medium)</p>
            <Input placeholder="Floor Size (Medium)" value={floorSizeMd} onChange={(e: ChangeEvent<HTMLFormElement>) => setFloorSizeMd(e.target.value)}  />
            
            <p className="mt-4">Floor Size (Large)</p>
            <Input placeholder="Floor Size (Large)" value={floorSizeLg} onChange={(e: ChangeEvent<HTMLFormElement>) => setFloorSizeLg(e.target.value)}  />
            
            <p className="mt-4">Floor Size (Extra Large)</p>
            <Input placeholder="Floor Size (Extra Large)" value={floorSizeXl} onChange={(e: ChangeEvent<HTMLFormElement>) => setFloorSizeXl(e.target.value)}  />
            
            <Button onClick={onClickAdd}>Add Parking</Button>
            <Button onClick={() => router.back()}>Go Back</Button>
        </div>
    </>
}

export default AddParking;