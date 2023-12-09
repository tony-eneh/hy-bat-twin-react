import React, { useState } from 'react';
import { Header, Sidebar } from './';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggle={() => setOpen(!open)} />
      <div className="flex flex-grow relative">
        {/* background gradients */}
        <div className="absolute top-2 right-2 w-56 h-56 rounded-full opacity-50 -z-20 bg-gradient-to-tr from-[#a18cd1] to-[#fbc2eb]"></div>
        <div className="absolute top-1/2 left-64 w-56 h-56 rounded-full opacity-50 -z-20 bg-gradient-to-t from-[#a1c4fd] to-[#c2e9fb]"></div>
        <div className="absolute bottom-2 right-0 w-56 h-56 rounded-full opacity-50 -z-20 bg-gradient-to-t from-[#e0c3fc] to-[#8ec5fc]"></div>

        <Sidebar open={open} setOpen={setOpen} />
        {children}
      </div>
    </div>
  );
}
