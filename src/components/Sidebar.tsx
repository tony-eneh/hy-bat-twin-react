import { useEffect, useState } from 'react';
import searchIcon from '../assets/images/search.png';
import openBoxIcon from '../assets/images/open-box.png';
import batteryIcon from '../assets/images/menu-item.png';
import cogIcon from '../assets/images/cog.png';
import { Link } from 'react-router-dom';
import { TriangleIcon } from './icons';
import { useWindowSize } from '@uidotdev/usehooks';
import { useDispatch, useSelector } from 'react-redux';
import { ApiStatus, Battery } from '../models';
import { getBatteries } from '../redux/batteriesSlice';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar(props: Props) {
  const { open, setOpen } = props;
  const { data: batteries, status } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.battery
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(getBatteries() as any);
  }, []);

  // const [batteriesExpanded, setBatteriesExpanded] = useState(false);
  const [openTab, setOpenTab] = useState<'architecture' | 'settings'>(
    'architecture'
  );
  const [deployExpanded, setDeployExpanded] = useState(true);
  const [batteryExpanded, setBatteryExpanded] = useState<{
    [k in string]: boolean;
  }>({});

  const windowSize = useWindowSize();
  const isMobile = windowSize.width! < 640; // 640px is the 'sm' breakpoint by tailwind

  return (
    <>
      {/* background overlay */}
      {open && isMobile && (
        <div
          className="fixed -z-2 inset-0 bg-gray-500/80 sm:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
      {/* actual sidebar */}
      <aside
        className={`bg-sidebarBg text-gray-300 fixed top-0 left-0 bottom-0 sm:static shrink-0 w-64 transition-transform ${
          open || !isMobile ? 'translate-x-0' : '-translate-x-80'
        }`}
      >
        <nav className="flex items-center w-full">
          {['Architecture', 'Settings'].map((tab) => (
            <span
              className={`flex-1 border-b-8 text-center p-1 cursor-pointer ${
                openTab === tab.toLowerCase()
                  ? 'border-b-highlight'
                  : 'border-b-black'
              }`}
              onClick={() =>
                setOpenTab(tab.toLowerCase() as 'architecture' | 'settings')
              }
              key={tab}
            >
              {tab}
            </span>
          ))}
        </nav>

        {openTab === 'architecture' && (
          <ul className="my-4">
            <li>
              <Link to={'/'} className="flex items-center gap-2 pl-7 my-2">
                <img src={searchIcon} alt="" />
                System Overview
              </Link>
            </li>
            <li>
              <Link
                to={'/batteries'}
                className="flex items-center gap-2 pl-3 my-2 cursor-pointer select-none"
                onClick={() => setDeployExpanded(!deployExpanded)}
              >
                <TriangleIcon expanded={deployExpanded} />
                <img src={openBoxIcon} alt="" />
                Deployment
              </Link>
              <ul
                className={`pl-3 overflow-hidden transition-all ${
                  deployExpanded ? 'h-72' : 'h-0'
                }`}
              >
                {status === ApiStatus.PENDING ? (
                  <li className="pl-3">loading...</li>
                ) : (
                  (batteries as Battery[]).map((battery) => (
                    <li key={battery.id}>
                      <Link
                        to={`/batteries/${battery.id}`}
                        className="flex items-center gap-2 pl-3 my-2"
                        onClick={() =>
                          setBatteryExpanded({
                            [battery.id]: !batteryExpanded[battery.id],
                          })
                        }
                      >
                        <TriangleIcon expanded={batteryExpanded[battery.id]} />
                        <img src={batteryIcon} alt="" className="h-6" />
                        {battery.name}
                      </Link>
                      <ul
                        className={`pl-3 overflow-hidden transition-all ${
                          batteryExpanded[battery.id] ? 'h-32' : 'h-0'
                        }`}
                      >
                        <li className="h-8">
                          <Link
                            to={`/batteries/${battery.id}?graph=temperature`}
                            className="flex items-center gap-2 pl-3 my-2"
                          >
                            <img src={cogIcon} alt="" className="h-6" />
                            Temperature
                          </Link>
                        </li>
                        <li className="h-8">
                          <Link
                            to={`/batteries/${battery.id}?graph=voltage`}
                            className="flex items-center gap-2 pl-3 my-2"
                          >
                            <img src={cogIcon} alt="" className="h-6" />
                            Voltage
                          </Link>
                        </li>
                        <li className="h-8">
                          <Link
                            to={`/batteries/${battery.id}?graph=current`}
                            className="flex items-center gap-2 pl-3 my-2"
                          >
                            <img src={cogIcon} alt="" className="h-6" />
                            Current
                          </Link>
                        </li>
                      </ul>
                    </li>
                  ))
                )}
              </ul>
            </li>
          </ul>
        )}
      </aside>
    </>
  );
}
