import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import PlusIcon from '@heroicons/react/20/solid/PlusIcon';
import DollarIcon from '@heroicons/react/20/solid/CurrencyDollarIcon';
import ExclamationTriangleIcon from '@heroicons/react/20/solid/ExclamationTriangleIcon';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { routes } from '@/constants/routes';


enum Options {
  ADD_PARKING,
  ENTER_CAR,
  EXIT_CAR
}

export default function Home() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<Options | null>(null);

  const onClickGo = () => {
    if(selectedOption === Options.ADD_PARKING) {
      router.push(routes.ADD_PARKING)
    } else if(selectedOption === Options.ENTER_CAR) {
      router.push(routes.ENTER_CAR)
    } else if(selectedOption === Options.EXIT_CAR) {
      router.push(routes.EXIT_CAR)
    }
  }

  return (
    <>
      <div className="h-screen w-full bg-blue-100">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className='text-6xl mb-8 text-blue-900 font-bold'>What do you want to do?</h1>
          {/* Checkboxes section start */}
          <div className="mb-8 flex space-x-10">
            <Checkbox isChecked={selectedOption === Options.ADD_PARKING} onClick={() => setSelectedOption(Options.ADD_PARKING)}>
              <PlusIcon className="h-40 w-40" />
              <p className="text-2xl uppercase font-bold">Add Parking Lot</p>
            </Checkbox>
            <Checkbox isChecked={selectedOption === Options.ENTER_CAR} onClick={() => setSelectedOption(Options.ENTER_CAR)}>
              <DollarIcon className="h-40 w-40" />
              <p className="text-2xl uppercase font-bold">Enter Car</p>
            </Checkbox>
            <Checkbox isChecked={selectedOption === Options.EXIT_CAR} onClick={() => setSelectedOption(Options.EXIT_CAR)}>
              <ExclamationTriangleIcon className="h-40 w-40" />
              <p className="text-2xl uppercase font-bold">Exit Car</p>
            </Checkbox>
          </div>
          {/* Checkboxes section end. */}
          <Button onClick={onClickGo}>Go</Button>
        </div>
      </div>
    </>
  )
}
