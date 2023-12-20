import React, { useRef, useState } from 'react';
import { useClickOutside } from '../hooks';

interface Props<T> {
  options: T[];
  selected: T;
  setSelected: (item: T) => void;
  display?: (item: T) => string;
  className?: string;
}

export function Dropdown<T>({
  selected,
  setSelected,
  display = (item: T) => item as string,
  options,
  className = '',
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const optionsRef = useRef(null);
  useClickOutside(optionsRef, () => setOpen(false), open);

  return (
    <div className={`relative min-w-[5rem] ${className}`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        className="border rounded w-full h-9 px-2 text-left"
      >
        {display(selected)}&nbsp;
      </button>
      {open && (
        <ul
          className={`absolute bg-white py-4 right-0 shadow-lg text-left`}
          ref={optionsRef}
        >
          {options?.map((option, i) => (
            <li
              key={i}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`whitespace-nowrap hover:bg-slate-300 hover:text-black px-4 py-2 cursor-pointer ${
                selected === option && 'bg-slate-600 text-white'
              }`}
            >
              {display(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
