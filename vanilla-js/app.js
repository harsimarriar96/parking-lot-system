const database = {
    parkingLots: [],
    slots: [],
    cars: []
}
let slotId = 0;
let parkingLotId = 0;
let carId = 0;

const addParkingLot = (floorSize, floors) => {
    const slots = [];
    const lotId = ++parkingLotId;

    for(let j = 0; j < floors; j++) {
        Object.keys(floorSize).forEach((key) => {
            for(let i = 0; i < floorSize[key]; i++) {
                slots.push({
                    id: ++slotId,
                    lotId,
                    size: key,
                    isOccupied: false,
                    floor: j,
                })
            }
        })
    }

    database.parkingLots.push({
        id: lotId,
        spaces: slots.length,
        floorSize,
        floors
    });
    database.slots = [...database.slots, ...slots];
}

const sizes = ['sm', 'md', 'lg', 'xl'];

const enterCar = (carType, parkingLotId) => {
    let selectedSlot;
    // Get all the parking spaces car can adjust in. (Remove smaller option for larger cars: for eg: for md cars it will get md -> lg -> xl)
    const adjustedIn = sizes.splice(sizes.indexOf(carType));

    database.parkingLots.forEach((parkingLot) => {
        // Select Parking Lot
        if(parkingLot.id === parkingLotId) {
            // Find available slot (Will go from sm -> md -> lg -> xl) and also change the slot to occupied.
            adjustedIn.forEach((size) => {
                if(!selectedSlot) {
                    selectedSlot = database.slots.find((slot) => !slot.isOccupied && slot.size === size)
                }
            })

            if(selectedSlot) {
                // Add car
                database.cars.push({
                    id: ++carId,
                    type: carType,
                    slotId: selectedSlot.id,
                    slotNumber: `${selectedSlot.floor}:${selectedSlot.bayId}`,
                    entryTime: new Date(),
                })
            }

        }
    })

    // Using slot.id as bayId since we'll be just incrementing that as well, in real solutions, it would differ.
    return selectedSlot ? `${selectedSlot.floor}:${selectedSlot.id}` : 'No Slot';
}

const leaveCar = (carId) => {
    // Change the slot back to unoccupied.
    database.cars.forEach((car) => {
        if(car.id === carId) {
            database.slots.forEach((slot, slotIndex) => {
                if(car.slotId === slot.id) {
                    database.slots[slotIndex].isOccupied = false;
                }
            })
        }
    })
}


addParkingLot({
    sm: 1,
    md: 0,
    lg: 0,
    xl: 0
}, 3)


console.log(enterCar('sm', 1));