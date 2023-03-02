import { Button } from "@/components/Button";
import { CarInterface } from "@/types/Car";
import { CarSizes, CarSizesType } from "@/types/CarSizes";
import { ParkingLotInterface } from "@/types/ParkingLot";
import { SlotInterface } from "@/types/Slot";
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react";

const EnterCar = () => {
    const router = useRouter();

    const [cars, setCars] = useState<ParkingLotInterface[]>([]);
    const [selectedCar, setSelectedCar] = useState<number>();
    const [message, setMessage] = useState<string>('')

    const getCars = async () => {
        const response: ParkingLotInterface[] = JSON.parse(await localStorage.getItem('cars') || '[]');
        setCars(response);
    }

    const onClickEnter = async () => {    
        const allSlots: SlotInterface[] = JSON.parse(await localStorage.getItem('slots') || '[]');
        const allCars: CarInterface[] = JSON.parse(await localStorage.getItem('cars') || '[]');

        let carToExit: CarInterface;
        allCars.forEach((car) => {
            if(car.id === selectedCar && !car.exitTime) {
                carToExit = car;
                car.exitTime = new Date();
            }
        })

        // Using the forEach loops to do things a little quicker, ideal way would be to break the loops once selected the slot.
        allSlots.forEach((slot) => {
            if(carToExit && slot.id === carToExit.slotId) {
                slot.isOccupied = false;
            }   
        })

        if(carToExit) {
            await localStorage.setItem('slots', JSON.stringify(allSlots));
            await localStorage.setItem('cars', JSON.stringify(allCars));

            setMessage(`Car ${carToExit.id} removed from ${carToExit.floor}:${carToExit.slotId}`);
        } else {
            setMessage('Invalid car.')
        }

    } 

    useEffect(() => {
        getCars();
    }, [])

    return(<div className="flex flex-col gap-4">

        <h1 className="mb-10 text-5xl">Exit Car</h1>

        <p>Car</p>
        <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCar(Number(e.target.value))}>
            <option>Select Car</option>
            {cars.map(({id}) => <option value={id} key={id}>{id}</option>)}
        </select>

        <p className="my-2">{message}</p>

        <Button onClick={onClickEnter}>Exit</Button>
        <Button onClick={() => router.back()}>Go Back</Button>
    </div>);
}

export default EnterCar;