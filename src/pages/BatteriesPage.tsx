import { useSelector } from 'react-redux';
import { AppStore } from '../types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NewDigitalTwinModal, PlusIcon } from '../components';
import { stripTime, truncateText } from '../helpers';
import { useScreenSize } from '../hooks';

export default function BatteriesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: batteries } = useSelector((state: AppStore) => state.batteries);
  const { isMobile } = useScreenSize();

  if (!batteries?.length)
    return (
      <div className="h-full flex items-center justify-center text-2xl">
        No battery
      </div>
    );

  return (
    <div className="flex-grow p-8">
      <div className="max-w-2xl mx-auto">
        <button
          className="flex items-center gap-3 bg-sidebarBg text-white p-3 rounded ml-auto"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusIcon />
          Create Digital Twin
        </button>
      </div>

      <h2 className="text-center text-3xl font-bold my-6">Your Batteries</h2>

      <ul className="max-w-2xl mx-auto space-y-4 my-4">
        {batteries.map((battery) => (
          <li
            key={battery.id}
            className="w-full min-h-[10rem] rounded-lg border border-slate-200 flex overflow-hidden hover:scale-x-105 transition-transform bg-white/30 backdrop-blur-md"
          >
            <div>
              <img
                src={battery.image}
                alt="image of this battery"
                className="w-36 h-full object-cover"
              />
            </div>

            <div className="p-2 flex flex-col gap-4 w-full">
              <h3 className="font-bold">{battery.name}</h3>
              <p className="text-slate-600 text-sm w-full overflow-hidden min-h-[2rem]">
                {isMobile
                  ? truncateText(battery.description, 30)
                  : truncateText(battery.description, 50)}
              </p>
              <div className="flex flex-wrap justify-between items-center text-sm border-t border-t-gray-200 pt-2">
                <span>
                  <span className="italic">Created at: </span>
                  {stripTime(battery.createdAt)}
                </span>
                <Link
                  to={`/batteries/${battery.id}`}
                  className="border border-slate-300 px-2 py-1 rounded-lg hover:bg-slate-700 hover:text-white"
                >
                  View Details
                </Link>
                <span className="flex items-center gap-2 text-sm">
                  {/* connection status */}
                  {battery.dataSource ? 'Connected' : 'Not Connected'}
                  <span
                    className={`h-2 w-2 rounded-full inline-block ${
                      battery.dataSource
                        ? 'bg-green-400 ring-2 ring-green-200'
                        : 'bg-red-400 ring-2 ring-red-200'
                    }`}
                  ></span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <NewDigitalTwinModal
        show={showCreateModal}
        close={() => setShowCreateModal(false)}
      />
    </div>
  );
}
