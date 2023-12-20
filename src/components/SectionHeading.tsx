import { ReactNode } from 'react';

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="p-2 border-b-8 border-b-highlight bg-sidebarBg inline-block self-start text-gray-50">
      {children}
    </h3>
  );
}
