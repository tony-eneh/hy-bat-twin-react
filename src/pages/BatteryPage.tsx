import { useEffect, useState } from 'react';
import { getBatteryById } from '../services/batteries';
import { useParams } from 'react-router-dom';
import { Battery } from '../types';
import { Prediction } from '../components/Prediction';
import { Analysis } from '../components/Analysis';
import { BatteryDetails } from '../components/BatteryDetails';

export function BatteryPage() {
  const [battery, setBattery] = useState<Battery>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();

  useEffect(() => {
    getBatteryById(+id!)
      .then((res) => setBattery(res.data as Battery))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    battery && (
      <div className="h-full flex flex-col">
        <h2 className="lg:col-span-2 font-['Kaushan_Script'] font-bold text-2xl text-center text-sidebarBg p-2 bg-white/70 backdrop-blur-sm">
          {battery.name}
        </h2>
        <div className="flex-grow grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2">
          <BatteryDetails battery={battery} />
          <Analysis battery={battery} className="row-span-2 row-start-3 lg:row-start-1 lg:col-start-2" />
          <Prediction battery={battery} className='row-start-2'/>
        </div>
      </div>
    )
  );
}
