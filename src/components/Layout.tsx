import React, { useState } from 'react';
import { Header, Sidebar } from './';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="">
      <Header toggle={() => setOpen(!open)} />
      <div>
        <Sidebar open={open} />
        {children}
      </div>
    </div>
  );
}
