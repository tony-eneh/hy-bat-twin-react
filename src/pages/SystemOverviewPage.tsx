import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Dropdown, BatteriesIcon, PlusIcon } from '../components';
// import { useDataSources } from '../hooks';
import { ApiResponse, AppStore, Battery, BatteryData } from '../types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSources } from '../services/data-sources';
import { setDataSources } from '../redux/dataSourcesSlice';
import { createBattery, getBatteries } from '../services/batteries';
import { setBatteries } from '../redux/batteriesSlice';
import { toaster } from '../helpers';

export function SystemOverviewPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex flex-col items-center flex-grow p-4 gap-10 justify-center text-center">
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

// modal component
interface ModalProps {
  show: boolean;
  close: () => void;
}

function NewDigitalTwinModal({ show, close }: ModalProps) {
  const [newBatteryName, setNewBatteryName] = useState('');
  const [newBatterySource, setNewBatterySource] = useState<BatteryData>();
  const { data: sources } = useSelector<AppStore, ApiResponse<BatteryData[]>>(
    (state) => state.dataSources
  );
  const [newlyCreatedBattery, setNewlyCreatedBattery] = useState({} as Battery);
  const [creatingBattery, setCreatingBattery] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  const clearData = useCallback(() => {
    setNewBatteryName('');
    setNewBatterySource(undefined);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    getDataSources().then((res) => dispatch(setDataSources(res)));
  }, [dispatch]);

  const handleNewDigitalTwinSubmit = (e: FormEvent) => {
    e.preventDefault();
    // console.log({ newBatterySource });
    if (!newBatterySource) return;

    setCreatingBattery(true);

    createBattery({
      name: newBatteryName,
      source: newBatterySource.id + '',
    })
      .then((res) => {
        setNewlyCreatedBattery(res.data);
        toaster.success(res.message);
      })
      .then(() => getBatteries()) // refresh list
      .then((res) => dispatch(setBatteries(res)))
      .finally(() => setCreatingBattery(false));
  };

  return (
    <Modal
      show={show}
      close={() => {
        clearData();
        close();
      }}
    >
      <form onSubmit={handleNewDigitalTwinSubmit} className="m-5 space-y-5">
        <p className='font-["Kaushan_Script"]'>New Digital Twin</p>

        <div className="flex gap-2 items-center">
          <label>Data Source</label>
          <Dropdown
            className="flex-grow"
            options={sources!}
            selected={newBatterySource}
            setSelected={(source) => {
              setNewBatterySource(source);
              setNewBatteryName(source?.name + ' - ');
              nameRef?.current?.focus();
            }}
            display={(source) => (source ? source.name : '')}
          />
        </div>

        <div className="flex gap-2 items-center">
          <label>Name</label>
          <input
            type="text"
            className="flex-grow border rounded h-9 px-2"
            value={newBatteryName}
            onChange={(e) => setNewBatteryName(e.target.value)}
            ref={nameRef}
          />
        </div>

        {/* {newlyCreatedBattery && (
          <div className="bg-green-200 text-green-900 p-3 rounded text-sm !my-9">
            Asset Created successfully!
          </div>
        )} */}

        <div className="flex gap-3 justify-center items-center !my-8">
          <button
            type="submit"
            disabled={creatingBattery}
            className="bg-sidebarBg text-white px-8 py-2 rounded-lg disabled:bg-sidebarBg/70 disabled:cursor-not-allowed"
          >
            {creatingBattery ? 'Saving...' : 'Save'}
          </button>
          {newlyCreatedBattery && (
            <Link
              to={`/batteries/${newlyCreatedBattery?.id}`}
              className="border border-sidebarBg px-4 py-2 rounded-lg"
            >
              View New Asset
            </Link>
          )}
        </div>
      </form>
    </Modal>
  );
}
