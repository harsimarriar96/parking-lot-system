import { Button } from "@/components/Button";
import { CarInterface } from "@/types/Car";
import { CarSizes, CarSizesType } from "@/types/CarSizes";
import { ParkingLotInterface } from "@/types/ParkingLot";
import { SlotInterface } from "@/types/Slot";
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react";

const EnterCar = () => {
    const router = useRouter();

    const [parkingLots, setParkingLots] = useState<ParkingLotInterface[]>([]);
    const [selectedParkingLot, setSelectedParkingLot] = useState<number>();
    const [selectedCarSize, setSelectedCarSize] = useState<CarSizesType>(CarSizes.SM);
    const [message, setMessage] = useState<string>('')

    const getParkingLots = async () => {
        const response: ParkingLotInterface[] = JSON.parse(await localStorage.getItem('parkingLots') || '[]');
        setParkingLots(response);
    }

    const onClickEnter = async () => {    
        const allSlots: SlotInterface[] = JSON.parse(await localStorage.getItem('slots') || '[]');

        const allSizes: string[] = [CarSizes.SM, CarSizes.MD, CarSizes.LG, CarSizes.XL];
        let slotSizesToFit: string[] = allSizes.splice(allSizes.indexOf(selectedCarSize));

        let selectedSlotToPark: SlotInterface | undefined;

        // Using the forEach loops to do things a little quicker, ideal way would be to break the loops once selected the slot.
        allSlots.forEach((slot) => {
            if(slot.lotId === selectedParkingLot) {
                slotSizesToFit.forEach((slotSize) => {
                    if(!selectedSlotToPark && slotSize === slot.size && !slot.isOccupied) {
                        selectedSlotToPark = slot;
                        slot.isOccupied = true;
                    }   
                })
            }
        })

        if(selectedSlotToPark) {
            const lastCarId: string | null = await localStorage.getItem('lastCarId');
            const carId: number = Number(lastCarId) + 1;
            
            const cars: CarInterface[] = JSON.parse(await localStorage.getItem('cars') || '[]');
            const newCar: CarInterface[] = {
                id: Number(carId),
                size: selectedCarSize,
                slotId: Number(selectedSlotToPark?.id),
                floor: Number(selectedSlotToPark?.floor),
                enterTime: new Date()
            }

            await localStorage.setItem('slots', JSON.stringify(allSlots));
            await localStorage.setItem('lastCarId', carId.toString());
            await localStorage.setItem('cars', JSON.stringify(cars.length ? [...cars, ...newCar] : []));

            setMessage(`Added car to ${selectedSlotToPark.floor}:${selectedSlotToPark.id}`);
        } else {
            setMessage('No slot available.')
        }

    } 

    useEffect(() => {
        getParkingLots();
    }, [])

    return(<div className="flex flex-col gap-4">

        <h1 className="mb-10 text-5xl">Enter New Car</h1>

        <p>Parking Lot</p>
        <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedParkingLot(Number(e.target.value))}>
            <option>Select parking lot</option>
            {parkingLots.map(({id}) => <option value={id} key={id}>{id}</option>)}
        </select>

        <p className="mt-4">Car Size</p>
        <select className="mb-8" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCarSize(e.target.value)}>
            <option value={CarSizes.SM}>Small</option>
            <option value={CarSizes.MD}>Medium</option>
            <option value={CarSizes.LG}>Large</option>
            <option value={CarSizes.XL}>Extra Large</option>
        </select>

        <p className="my-2">{message}</p>

        <Button onClick={onClickEnter}>Enter</Button>
        <Button onClick={() => router.back()}>Go Back</Button>
    </div>);
}

export default EnterCar;