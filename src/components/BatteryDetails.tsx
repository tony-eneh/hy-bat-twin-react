import { Battery, BatteryReading } from '../types';
import { SectionHeading } from './SectionHeading';
import {
  Battery3dModel,
  CaretIcon,
  CurrentIcon,
  Modal,
  SensorReadingsGraph,
  TemperatureIcon,
  VoltageIcon,
} from '.';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useEffect, useState } from 'react';
import { truncateText } from '../helpers';
import { getReadings } from '../services/batteries';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';

interface Props {
  battery: Battery;
  className?: string;
}

export function BatteryDetails({ battery, className = '' }: Props) {
  const [expandedView, setExpandedView] = useState(false);
  // const [modal, setModal] = useState<'temperature' | 'voltage' | 'current'>();
  const [readings, setReadings] = useState<BatteryReading[]>();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get('graph') as
    | 'temperature'
    | 'voltage'
    | 'current';

  const navigate = useNavigate();

  useEffect(() => {
    getReadings(battery.id).then((res) => setReadings(res.data));
  }, [battery.id]);

  return (
    <div className={`${className} h-full w-full flex relative`}>
      <div className="absolute z-10">
        <SectionHeading>Details</SectionHeading>
      </div>
      <div className="w-full flex flex-col justify-end">
        <div className="absolute top-0 right-0 bottom-0 left-0 -z-10">
          <ErrorBoundary fallback={<ModelError image={battery.image!} />}>
            <Suspense fallback={<ModelLoading />}>
              {/* scene to show either static battery image or 3d rotating model */}
              <Canvas>
                <Battery3dModel battery={battery} />
              </Canvas>
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-2 space-y-2">
          <div>
            <button
              onClick={() => setExpandedView(!expandedView)}
              className="border p-2 rounded border-black absolute right-2"
            >
              <CaretIcon direction={expandedView ? 'down' : 'up'} />
            </button>
            <div>
              <span className="italic text-sm">Charge Cycles:</span>{' '}
              {battery.chargeCycles}
              <br />
              <span className="italic text-sm">Description:</span>{' '}
              {expandedView
                ? battery.description
                : truncateText(battery.description, 50)}
            </div>
          </div>
          <div className="flex justify-between">
            <Link
              to={`/batteries/${battery.id}?graph=temperature`}
              className="flex items-center gap-3 p-1 rounded cursor-pointer hover:bg-white hover:scale-105"
            >
              <TemperatureIcon /> <span>Temp.</span>
            </Link>
            <Link
              to={`/batteries/${battery.id}?graph=voltage`}
              className="flex items-center gap-3 p-1 rounded cursor-pointer hover:bg-white hover:scale-105"
            >
              <VoltageIcon /> <span>Voltage</span>
            </Link>
            <Link
              to={`/batteries/${battery.id}?graph=current`}
              className="flex items-center gap-3 p-1 rounded cursor-pointer hover:bg-white hover:scale-105"
            >
              <CurrentIcon /> <span>Current</span>
            </Link>
          </div>
        </div>
      </div>

      <Modal
        show={!!mode}
        close={() => {
          navigate(`/batteries/${battery.id}`);
        }}
        size="md"
      >
        <SensorReadingsGraph readings={readings || []} type={mode!} />
      </Modal>
    </div>
  );
}

function ModelLoading() {
  return (
    <div className="flex items-center justify-center">Loading Details...</div>
  );
}

function ModelError({ image }: { image: string }) {
  return (
    <div className="flex items-center justify-center relative overflow-hidden h-full -z-10">
      {/* <span>Error loading 3d model</span> */}
      <img src={image} alt="" className="object-cover" />
    </div>
  );
}
