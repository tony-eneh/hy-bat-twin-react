export interface BatteryReading {
  createdAt: Date; // when this reading was taken
  temperature: number;
  voltage: number;
  current: number;
}

// this data belongs to an actual physical instance of a battery
export interface BatteryData {
  id: number;
  name: string;
  createdAt: string;
  readings: BatteryReading[];
  predictions?: BatteryPrediction[];
}

// this data belongs to a digital twin on our platform, maps to a physical instance via dataSource property
export interface Battery {
  id: number;
  name: string;
  dataSource: string; // url of where to fetch sensor readings for this battery
  createdAt: string;
  predictions?: BatteryPrediction[];
  image?: string;
  description?: string;
  chargeCycles: number;
}

export interface BatteryPrediction extends BatteryPredictionPayload {
  createdAt: Date;
  soc: number; // state of charge
  soh: number; // state of health
}

export interface BatteryPredictionPayload {
  batteryId: number;
  chargeCycles: number;
}

export interface GetPredictionsPayload {
  batteryId: number;
  minChargeCycle: number;
  maxChargeCycle: number;
  step?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  totalRecords?: number;
  pageNumber?: number;
  pageSize?: number;
}

export enum ApiStatus {
  PENDING,
  ERROR,
  SUCCESS,
  IDLE,
}
export interface AppStore {
  batteries: ApiResponse<Battery[]>;
  dataSources: ApiResponse<BatteryData[]>;
}
