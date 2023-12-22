import { FormEvent, useState } from 'react';
import { isDigits } from '../helpers';
import { predictBattery } from '../services/batteries';
import { Modal } from '.';
import { Battery, BatteryPrediction } from '../types';
import { SectionHeading } from './SectionHeading';

interface Props {
  battery: Battery;
  className?: string;
}

export function Prediction({ battery, className }: Props) {
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState<BatteryPrediction>();
  const [chargeCycles, setChargeCycles] = useState<string>('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!chargeCycles) return;

    setPredicting(true);
    predictBattery({
      batteryId: battery.id,
      chargeCycles: +chargeCycles,
    })
      .then((res) => setPrediction(res.data))
      .finally(() => setPredicting(false));
  }

  return (
    <div className={`${className} bg-black text-gray-300 flex flex-col`}>
      <SectionHeading>Prediction</SectionHeading>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 flex flex-col items-center justify-center flex-grow"
      >
        <div className="flex gap-1">
          <input
            type="text"
            name="chargeCycles"
            value={chargeCycles}
            onChange={(e) =>
              (isDigits(e.target.value) || e.target.value === '') &&
              setChargeCycles(e.target.value)
            }
            placeholder="Enter Charge Cycles"
            className="text-sm px-2 placeholder:text-gray-400 w-48 text-center h-8 text-gray-900 bg-gray-200"
          />
          <div className="h-8 w-8 bg-highlight"></div>
        </div>
        <button
          type="submit"
          className="bg-highlight h-8 px-12 text-center text-white disabled:bg-highlight/70 disabled:cursor-not-allowed"
          disabled={predicting || !chargeCycles}
        >
          {predicting ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      <Modal
        show={!!prediction}
        close={() => setPrediction(undefined)}
        bodyClasses="text-black"
      >
        <h4 className="text-center font-['Kaushan_Script'] mb-4">
          Prediction Result
        </h4>
        <div className="space-x-10 text-center">
          <span className="text-sm">State of Charge</span>&nbsp;
          <span>{prediction?.soc}</span>
        </div>
        <div className="space-x-10 text-center">
          <span className="text-sm">State of Health</span>&nbsp;
          <span>{prediction?.soh}</span>
        </div>
      </Modal>
    </div>
  );
}
