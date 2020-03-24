import {
  SeverityLevel,
  TransportMode,
  ValueSeverityLevel
} from '../store/types';

export const WEEK = 7 * 24 * 60 * 60 * 1000;

export const SYMPTOMS = ['Fever', 'Fatigue', 'Dry Cough', 'Dyspnea', 'Myalgia'];

export const SEV_LEVEL_SCORE = {
  [SeverityLevel.No]: 0,
  [SeverityLevel.Low]: 1,
  [SeverityLevel.Mild]: 2,
  [SeverityLevel.High]: 3
};

export const SEV_LEVEL_TEXTS = {
  [SeverityLevel.No]: 'No',
  [SeverityLevel.Low]: 'Low',
  [SeverityLevel.Mild]: 'Mild',
  [SeverityLevel.High]: 'High'
};

export const SEV_LEVEL_COLORS = {
  [SeverityLevel.No]: '#00C000',
  [SeverityLevel.Low]: '#FFD600',
  [SeverityLevel.Mild]: '#FF9900',
  [SeverityLevel.High]: '#FF0000'
};

export const SEV_LEVEL_ORDER: ValueSeverityLevel[] = [
  SeverityLevel.No,
  SeverityLevel.Low,
  SeverityLevel.Mild,
  SeverityLevel.High
];

export const LABELS_TRANSPORT_FROM: {
  [key in TransportMode]: string;
} = {
  flight: 'fromAirport',
  train: 'fromStation',
  bus: 'fromLocation',
  taxi: 'fromLocation',
  other: 'fromLocation'
};

export const LABELS_TRANSPORT_TO: {
  [key in TransportMode]: string;
} = {
  flight: 'toAirport',
  train: 'toStation',
  bus: 'toLocation',
  taxi: 'toLocation',
  other: 'toLocation'
};

export const LABELS_TRANSPORT_ID: {
  [key in TransportMode]: string;
} = {
  flight: 'flightNumber',
  train: 'trainNumber',
  bus: 'busNumber',
  taxi: 'transportId',
  other: 'transportId'
};

export const RECORD_ICONS = {
  health: 'thermometer',
  travel: 'airplane',
  location: 'map-marker'
};

export const RECORD_ICON_COLORS = {
  health: 'rgb(0, 174, 239)',
  travel: 'rgb(0, 174, 239)',
  location: 'rgb(0, 174, 239)'
};

export const LEVEL_COLORS = ['#FFD600', '#FF9900', '#FF0000'];

export const RISK_COLORS = [
  '#00C000',
  '#1FDD1F',
  '#FFD600',
  '#FF9900',
  '#FF0000'
];

export const TRANSPORT_MODE_RADIO_ITEMS = [
  {
    text: 'Flight',
    value: TransportMode.Flight
  },
  {
    text: 'Train',
    value: TransportMode.Train
  },
  {
    text: 'Bus',
    value: TransportMode.Bus
  },
  {
    text: 'Taxi',
    value: TransportMode.Bus
  },
  {
    text: 'Other',
    value: TransportMode.Other
  }
];

export const TRANSPORT_MODE_ICONS = {
  [TransportMode.Flight]: 'airplane',
  [TransportMode.Train]: 'train',
  [TransportMode.Bus]: 'bus',
  [TransportMode.Taxi]: 'taxi',
  [TransportMode.Other]: 'bike'
};

export const DEFAULT_DATE = new Date('1996-01-01');

export const GENDER_RADIO_ITEMS = [
  {
    text: 'Male',
    value: 'male'
  },
  {
    text: 'Female',
    value: 'female'
  },
  {
    text: 'Other',
    value: 'other'
  }
];
