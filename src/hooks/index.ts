import { RefObject, useEffect, useState } from 'react';
import { Battery, BatteryData } from '../models';
import * as api from '../api';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOut: () => void,
  activate: boolean,
  ...deps: unknown[]
) {
  useEffect(() => {
    const onClick = ({ target }: Event) =>
      !ref?.current?.contains(target as Node) && onClickOut?.();

    if (!activate) {
      document.removeEventListener('click', onClick);
      return;
    }

    // without using setTimeout, the modal never shows up, as the onClickOut handler fires immediately it is shown
    setTimeout(() => document.addEventListener('click', onClick));

    return () => document.removeEventListener('click', onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activate, onClickOut, ref, ...deps]);
}

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T>(null as T);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get({ url, setLoading, setSuccess, setData, setMessage });
  }, [url]);

  return { data, loading, message, success };
}

// saved batteries
export function useBatteries() {
  const { data, loading, message, success } = useFetch<Battery[]>(
    import.meta.env.VITE_API_URL + '/batteries'
  );

  return { batteries: data || [], loading, message, success };
}

// data sources (physical batteries) to be connected to digital twins on the app
export function useDataSources() {
  const { data, loading, message, success } = useFetch<BatteryData[]>(
    import.meta.env.VITE_API_URL + '/data-sources'
  );

  return { data: data || [], loading, message, success };
}
