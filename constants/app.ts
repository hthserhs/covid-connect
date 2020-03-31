import { TagItem } from '../components/common/types';
import {
  SeverityLevel,
  TransportMode,
  ValueSeverityLevel
} from '../components/records/state/types';
import { TextKey } from '../util/translation';
import { C1, C2, C3, C4, C5 } from './colors';

export const WEEK = 7 * 24 * 60 * 60 * 1000;

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
  [SeverityLevel.High]: 'Severe'
};

export const SEV_LEVEL_COLORS = {
  [SeverityLevel.No]: C2,
  [SeverityLevel.Low]: C3,
  [SeverityLevel.Mild]: C4,
  [SeverityLevel.High]: C5
};

export const SEV_LEVEL_ORDER: ValueSeverityLevel[] = [
  SeverityLevel.Low,
  SeverityLevel.Mild,
  SeverityLevel.High
];

export const LABELS_TRANSPORT_FROM: {
  [key in TransportMode]: TextKey;
} = {
  flight: 'from_airport',
  train: 'from_station',
  bus: 'from_location',
  taxi: 'from_location',
  other: 'from_location'
};

export const LABELS_TRANSPORT_TO: {
  [key in TransportMode]: TextKey;
} = {
  flight: 'to_airport',
  train: 'to_station',
  bus: 'to_location',
  taxi: 'to_location',
  other: 'to_location'
};

export const LABELS_TRANSPORT_ID: {
  [key in TransportMode]: TextKey;
} = {
  flight: 'flight_number',
  train: 'train_number',
  bus: 'bus_number',
  taxi: 'transport_id',
  other: 'transport_id'
};

export const RECORD_ICONS = {
  health: 'thermometer',
  travel: 'airplane',
  location: 'map-marker'
};

export const RECORD_ICON_COLORS = {
  health: C1,
  travel: C1,
  location: C1
};

export const LEVEL_COLORS = [C3, C4, C5];

export const RISK_COLORS = [C2, C3, C4, C5];

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
    value: TransportMode.Taxi
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

export type CovidRiskFactorItemName =
  | 'travelToAffectedArea'
  | 'closeContactSuspected'
  | 'closeContactPositive'
  | 'frontLineHealthWorked';

export const COVID_RISK_FACTOR_TAG_ITEMS: TagItem<CovidRiskFactorItemName>[] = [
  {
    name: 'travelToAffectedArea',
    text: 'History of travel or meeting in affected region(s)'
  },
  {
    name: 'closeContactSuspected',
    text: 'Close contact with someone with symptoms'
  },
  {
    name: 'closeContactPositive',
    text: 'Close contact with someone COVID-19 positive'
  },
  {
    name: 'frontLineHealthWorked',
    text: 'Deployed as front-line health worker'
  }
];

export type CoMorbiditiesItemName =
  | 'diabetes'
  | 'highBloodPressure'
  | 'heartDisease'
  | 'kidneyDisease'
  | 'lungDisease'
  | 'stroke'
  | 'reducedImmunity';

export const CO_MORBIDITIES_TAG_ITEMS: TagItem<CoMorbiditiesItemName>[] = [
  {
    name: 'diabetes',
    text: 'Diabetes'
  },
  {
    name: 'highBloodPressure',
    text: 'High Blood Pressure'
  },
  {
    name: 'heartDisease',
    text: 'Heart Disease'
  },
  {
    name: 'kidneyDisease',
    text: 'Kidney Disease'
  },
  {
    name: 'lungDisease',
    text: 'Lung Disease'
  },
  {
    name: 'stroke',
    text: 'Stroke'
  },
  {
    name: 'reducedImmunity',
    text: 'Reduced Immunity'
  }
];
