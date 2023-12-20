import { useEffect, useState } from 'react';
import { Battery, BatteryPrediction } from '../types';
import { SectionHeading } from './SectionHeading';
import { getPredictions } from '../services/batteries';
import PredictionsGraph from './PredictionsGraph';

interface Props {
  battery: Battery;
  className?: string;
}

export function Analysis({ battery, className = '' }: Props) {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<BatteryPrediction[]>();

  useEffect(() => {
    setLoading(true);
    getPredictions({
      batteryId: battery.id,
      minChargeCycle: battery.chargeCycles,
      maxChargeCycle: battery.chargeCycles + 100,
      step: 10,
    })
      .then((res) => setPredictions(res.data))
      .finally(() => setLoading(false));
  }, [battery]);

  return (
    <div className={`${className} flex flex-col gap-8 overflow-y-auto pb-8`}>
      <SectionHeading>Analysis</SectionHeading>

      {loading && <div>Loading...</div>}
      {!loading && !predictions && <div>No predictions found</div>}

      {predictions && (
        <>
          {/* <div className="flex-grow"> */}
          <PredictionsGraph
            className="flex-grow"
            predictions={predictions}
            type="soc"
          />
          {/* </div>
          <div className="flex-grow"> */}
          <PredictionsGraph
            className="flex-grow"
            predictions={predictions}
            type="soh"
          />
          {/* </div> */}
        </>
      )}
    </div>
  );
}
