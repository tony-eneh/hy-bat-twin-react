import { Battery } from '../types';
import { SectionHeading } from './SectionHeading';

interface Props {
  battery: Battery;
  className?: string;
}

export function BatteryDetails({ battery, className = '' }: Props) {
  return (
    <div className={`${className} h-full w-full flex`}>
      <div className="absolute">
        <SectionHeading>Details</SectionHeading>
      </div>
      <div className="w-full">
        {/* scene to show either static battery image or 3d rotating model */}
        {/* <img src={battery.image} alt="" className="" /> */}
      </div>
    </div>
  );
}
