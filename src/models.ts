export interface BatteryData {
  id: number;
  name: string;
  createdAt: Date; // when this reading was taken
  temperature: number;
  voltage: number;
  current: number;
}

export interface Battery {
  id: number;
  name: string;
  dataSource: string; // url of where to fetch sensor readings for this battery
  createdAt: string;
  predictions?: BatteryPrediction[];
}

export interface BatteryPrediction {
  batteryId: number;
  createdAt: Date;
  soc: number; // state of charge
  soh: number; // state of health
  chargeCycles: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  totalRecords?: number;
  pageNumber?: number;
  pageSize?: number;
}