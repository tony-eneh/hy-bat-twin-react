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
      <div className="grid grid-cols-2 grid-rows-2 h-full">
        <BatteryDetails battery={battery} />
        <Analysis battery={battery} className="row-span-2" />
        <Prediction battery={battery} />
      </div>
    )
  );
}
