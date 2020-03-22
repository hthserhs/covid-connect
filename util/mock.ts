import nanoid from 'nanoid/non-secure';
import { SYMPTOMS, WEEK } from '../constants/app';
import { randomIntegerInRange, sampleSize } from './util';

export function getRandomRecords() {
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
          level: randomIntegerInRange(1, 3)
        }))
        .sort((a, b) => b.level - a.level),
      type: sampleSize(['travel', 'health', 'location'])[0]
    }))
    .sort((a, b) => b.date - a.date);
}
