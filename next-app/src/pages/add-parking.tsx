import { Button } from "@/components/Button";
import { Input } from "@/components/Input"
import { useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";

const AddParking = () => {
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

        const lastParkingLotId = await localStorage.getItem('lastParkingLotId');
        const lastSlotId = await localStorage.getItem('lastSlotId');
        const currentParkingLots = JSON.parse(await localStorage.getItem('parkingLots'));
        const currentSlots = JSON.parse(await localStorage.getItem('slots'));

        const lotId = Number(lastParkingLotId) + 1;
        let slotId = Number(lastSlotId) + 1;


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

        const newSlots = []
        for(let floor = 0; floor < floors; floor++) {
            for(let smSlot = 0; smSlot < floorSizeSm; smSlot++) {
                newSlots.push({id: ++slotId, lotId, size: 'sm', isOccupied: false, floor});
            }

            for(let mdSlot = 0; mdSlot < floorSizeMd; mdSlot++) {
                newSlots.push({id: ++slotId, lotId, size: 'md', isOccupied: false, floor});
            }

            for(let lgSlot = 0; lgSlot < floorSizeLg; lgSlot++) {
                newSlots.push({id: ++slotId, lotId, size: 'lg', isOccupied: false, floor});
            }

            for(let xlSlot = 0; xlSlot < floorSizeXl; xlSlot++) {
                newSlots.push({id: ++slotId, lotId, size: 'xl', isOccupied: false, floor});
            }
        }


        await localStorage.setItem('parkingLots', JSON.stringify(currentParkingLots ? [...currentParkingLots, newParkingLot] : [newParkingLot]));
        await localStorage.setItem('slots', JSON.stringify(currentSlots ? [...currentSlots, ...newSlots] : [...newSlots]))
        await localStorage.setItem('lastParkingLotId', JSON.stringify(lotId));
        await localStorage.setItem('lastSlotId', JSON.stringify(slotId));

    }

    return <>
        <div className="flex flex-col gap-4">

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
        </div>
    </>
}

export default AddParking;