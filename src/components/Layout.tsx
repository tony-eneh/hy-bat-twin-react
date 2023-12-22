import React, { useState } from 'react';
import { Header, Sidebar } from './';
import { useScreenSize } from '../hooks';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  const [open, setOpen] = useState(true);
  const { isMobile } = useScreenSize();

  return (
    <div className="h-screen">
      <Header toggle={() => setOpen(!open)} />
      <div
        className={`flex flex-grow h-[calc(100vh_-_theme(space.12))] ${
          isMobile && '!h-[calc(100vh_-_theme(space.24))]'
        }`}
      >
        <Sidebar open={open} setOpen={setOpen} />
        <div className="overflow-y-auto relative w-full min-h-full">
          {/* background gradients */}
          <div className="fixed top-12 right-2 w-56 h-56 rounded-full opacity-50 -z-20 bg-gradient-to-tr from-[#a18cd1] to-[#fbc2eb]"></div>
          <div
            className={`fixed top-1/2 ${
              !open && isMobile ? 'left-0' : 'left-64'
            } w-56 h-56 rounded-full opacity-50 -z-20 bg-gradient-to-t from-[#a1c4fd] to-[#c2e9fb]`}
          ></div>
          <div className="fixed bottom-2 right-0 w-56 h-56 rounded-full opacity-50 -z-20 bg-gradient-to-t from-[#e0c3fc] to-[#8ec5fc]"></div>

          {children}
        </div>
      </div>
    </div>
  );
}
