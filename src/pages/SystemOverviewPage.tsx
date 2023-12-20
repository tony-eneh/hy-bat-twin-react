import { useState } from 'react';
import { BatteriesIcon, PlusIcon, NewDigitalTwinModal } from '../components';
import { Link } from 'react-router-dom';

export function SystemOverviewPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex flex-col items-center flex-grow p-4 gap-10 justify-center text-center h-full">
      <p className="font-['Kaushan_Script']">Hy Bat Twin</p>
      <p className="text-6xl font-bold">
        Digital twin model for <span className="line-through">gadgets</span>{' '}
        batteries
      </p>
      <p>
        Easily predict State of Health (SOH) and State of Charge (SOC) for your
        batteries using temperature, voltage, current and charge cycles as input
        parameters
      </p>
      <div className="flex items-center gap-3 justify-center">
        <button
          className="flex items-center gap-3 bg-sidebarBg text-white p-3 rounded-full"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusIcon />
          Create Digital Twin
        </button>
        <Link
          to={'/batteries'}
          className="flex items-center gap-3 rounded-full border border-gray-700 text-gray-700 border-solid p-3"
        >
          <BatteriesIcon />
          View Assets
        </Link>
      </div>

      <NewDigitalTwinModal
        show={showCreateModal}
        close={() => setShowCreateModal(false)}
      />
    </div>
  );
}
