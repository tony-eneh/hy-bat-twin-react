import {
  ApiResponse,
  Battery,
  BatteryPrediction,
  BatteryPredictionPayload,
} from '../types';
import { headers } from '../helpers';

export function getBatteries(): Promise<ApiResponse<Battery[]>> {
  return fetch(`${import.meta.env.VITE_API_URL}/batteries`, { headers }).then(
    (res) => res.json()
  );
}

export function createBattery(payload: {
  name: string;
  source: string;
}): Promise<ApiResponse<Battery>> {
  return fetch(`${import.meta.env.VITE_API_URL}/batteries`, {
    headers,
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

export function predictBattery(
  payload: BatteryPredictionPayload
): Promise<ApiResponse<BatteryPrediction>> {
  return fetch(`${import.meta.env.VITE_API_URL}/batteries/predict`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}
