import { FormEvent, useCallback, useRef, useState } from 'react';
import { Modal, Dropdown, BatteriesIcon, PlusIcon } from '../components';
import { useDataSources } from '../hooks';
import { BatteryData } from '../models';
import * as api from '../api';
import { Link } from 'react-router-dom';

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
  const [saving, setSaving] = useState(false);
  const { data: sources } = useDataSources();
  const nameRef = useRef<HTMLInputElement>(null);

  const clearData = useCallback(() => {
    setNewBatteryName('');
    setNewBatterySource(undefined);
  }, []);

  const handleNewDigitalTwinSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ newBatterySource });
    if (!newBatterySource) return;

    // TODO extract to a service
    api.post<{ name: string; source: number }, unknown>({
      url: import.meta.env.VITE_API_URL + '/batteries',
      body: {
        name: newBatteryName,
        source: newBatterySource.id,
      },
      setLoading: setSaving,
      setSuccess: () => {},
      setMessage: (e) => {
        console.log('an error occurred');
        console.log(e);
      },
      setData: () => {},
    });
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
            options={sources}
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

        <button
          type="submit"
          disabled={saving}
          className="bg-sidebarBg text-white px-4 py-2 w-24 rounded-lg !mt-9 inline-block disabled:bg-sidebarBg/70 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </Modal>
  );
}
