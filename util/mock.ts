import nanoid from 'nanoid/non-secure';
import {
  HealthRecord,
  TransportMode,
  TravelRecord
} from '../components/records/state/types';
import { SEV_LEVEL_ORDER, WEEK } from '../constants/app';
import { randomIntegerInRange, sample, sampleSize } from './util';

const AIRPORTS = ['BLR', 'MAA', 'DEL', 'BOM', 'CCU', 'VNS', 'LKO', 'COK'];
const AIRLINES = ['SG', '6E', 'G8', 'I5', 'AI'];
export const SYMPTOMS = ['Fever', 'Fatigue', 'Dry Cough', 'Dyspnea', 'Myalgia'];

export function getRandomHealthRecords(): HealthRecord[] {
  const numItems = randomIntegerInRange(2, 6);
  const now = Date.now();

  return Array(numItems)
    .fill(null)
    .map(_ => ({
      id: nanoid(),
      date: randomIntegerInRange(now - WEEK, now),
      symptoms: sampleSize(SYMPTOMS, randomIntegerInRange(1, 4))
        .map(name => ({
          name,
          level: sample(SEV_LEVEL_ORDER)
        }))
        .sort(
          (a, b) =>
            SEV_LEVEL_ORDER.indexOf(b.level) - SEV_LEVEL_ORDER.indexOf(b.level)
        ),
      type: 'health'
    }));
}

export function getRandomTravelRecords(): TravelRecord[] {
  const numItems = randomIntegerInRange(2, 6);
  const now = Date.now();

  return Array(numItems)
    .fill(null)
    .map(_ => {
      const [from, to] = sampleSize(AIRPORTS, 2);
      return {
        id: nanoid(),
        date: randomIntegerInRange(now - WEEK, now),
        type: 'travel',
        from,
        to,
        transportMode: sample(Object.values(TransportMode)),
        transportId: sample(AIRLINES) + ' ' + randomIntegerInRange(100, 999)
      };
    });
}
