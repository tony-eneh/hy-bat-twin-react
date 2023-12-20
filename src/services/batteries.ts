import {
  ApiResponse,
  Battery,
  BatteryPrediction,
  BatteryPredictionPayload,
  GetPredictionsPayload,
} from '../types';
import { headers, serialize } from '../helpers';

export function getBatteries(): Promise<ApiResponse<Battery[]>> {
  return fetch(`${import.meta.env.VITE_API_URL}/batteries`, { headers }).then(
    (res) => res.json()
  );
}

export function getBatteryById(id: number): Promise<ApiResponse<Battery>> {
  return fetch(`${import.meta.env.VITE_API_URL}/batteries/${id}`, {
    headers,
  }).then((res) => res.json());
}

export function createBattery(payload: {
  name: string;
  source: string;
  description: string;
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

export function getPredictions(
  payload: GetPredictionsPayload
): Promise<ApiResponse<BatteryPrediction[]>> {
  return fetch(
    `${import.meta.env.VITE_API_URL}/batteries/predictions?${serialize({
      ...payload,
      step: payload.step || 25,
    })}`,
    {
      headers,
    }
  ).then((res) => res.json());
}
