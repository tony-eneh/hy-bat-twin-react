import { useClickOutside } from '../hooks';
import React, { ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  close: () => void;
  show: boolean;
}

export function Modal({ children, close, show }: Props) {
  const inner = useRef(null);

  useClickOutside(inner, close, show);
  // TODO on escape

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={`relative z-50 ${show ? 'block' : 'hidden'}`}>
      <div className="bg-gray-700/25 fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
        <div
          ref={inner}
          className="bg-white rounded-md relative p-6 min-w-fit w-96 max-w-full"
        >
          <span
            className="absolute top-0 right-0 p-1 text-3xl/7 cursor-pointer"
            onClick={close}
          >
            &times;
          </span>
          {children}
        </div>
      </div>
    </div>
  );
}
