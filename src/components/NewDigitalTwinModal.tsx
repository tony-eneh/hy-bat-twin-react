import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ApiResponse, AppStore, Battery, BatteryData } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSources } from '../services/data-sources';
import { setDataSources } from '../redux/dataSourcesSlice';
import { createBattery, getBatteries } from '../services/batteries';
import { toaster } from '../helpers';
import { setBatteries } from '../redux/batteriesSlice';
import { Dropdown, Modal } from '.';
import { Link } from 'react-router-dom';

interface ModalProps {
  show: boolean;
  close: () => void;
}

export function NewDigitalTwinModal({ show, close }: ModalProps) {
  const [newBatteryName, setNewBatteryName] = useState('');
  const [newBatterySource, setNewBatterySource] = useState<BatteryData>();
  const [newBatteryDescription, setNewBatteryDescription] = useState('');
  const { data: sources } = useSelector<AppStore, ApiResponse<BatteryData[]>>(
    (state) => state.dataSources
  );
  const [newlyCreatedBattery, setNewlyCreatedBattery] = useState<Battery>();
  const [creatingBattery, setCreatingBattery] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  const clearData = useCallback(() => {
    setNewBatteryName('');
    setNewBatterySource(undefined);
    setNewBatteryDescription('');
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    getDataSources().then((res) => dispatch(setDataSources(res)));
  }, [dispatch]);

  const handleNewDigitalTwinSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newBatterySource || !newBatteryName) return;

    setCreatingBattery(true);

    createBattery({
      name: newBatteryName,
      source: newBatterySource.id + '',
      description: newBatteryDescription || '',
    })
      .then((res) => {
        setNewlyCreatedBattery(res.data);
        toaster.success(res.message);
      })
      .then(() => getBatteries()) // refresh list
      .then((res) => dispatch(setBatteries(res)))
      .finally(() => setCreatingBattery(false))
      .finally(() => clearData());
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

        <div className="flex gap-2 items-center">
          <label className="text-left">
            Description <br /> <small>(optional)</small>
          </label>
          <textarea
            className="flex-grow border rounded px-2"
            value={newBatteryDescription}
            onChange={(e) => setNewBatteryDescription(e.target.value)}
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
            disabled={
              creatingBattery ||
              !newBatterySource ||
              !newBatteryName
            }
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
