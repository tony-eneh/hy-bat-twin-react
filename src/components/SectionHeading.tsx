import { ReactNode } from 'react';

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="p-2 pr-6 bg-sidebarBg inline-block self-start text-gray-50 rounded-br-full shadow-md">
      {children}
    </h3>
  );
}
