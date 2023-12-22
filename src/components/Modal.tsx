import { useClickOutside } from '../hooks';
import React, { ReactNode, useEffect, useRef } from 'react';

const sizes = {
  sm: ' w-96',
  md: 'w-1/2',
  lg: 'w-3/4',
  xl: 'w-full',
};
interface Props {
  children: ReactNode;
  close: () => void;
  show: boolean;
  bodyClasses?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  children,
  close,
  show,
  bodyClasses,
  size = 'sm',
}: Props) {
  const inner = useRef(null);

  useClickOutside(inner, close, show);
  // TODO on escape

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return show ? (
    <div className={'relative z-50 ' + bodyClasses}>
      <div className="bg-gray-700/25 fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
        <div
          ref={inner}
          className={`bg-white rounded-md relative p-6 min-w-fit max-w-full mx-2 ${sizes[size]}`}
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
  ) : null;
}
