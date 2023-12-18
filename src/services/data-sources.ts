import { headers } from '../helpers';
import { ApiResponse, BatteryData } from '../types';

export function getDataSources(): Promise<ApiResponse<BatteryData[]>> {
  return fetch(`${import.meta.env.VITE_API_URL}/data-sources`, {
    headers,
  }).then((res) => res.json());
}
