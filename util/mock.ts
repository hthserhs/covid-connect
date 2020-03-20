import nanoid from 'nanoid/non-secure';
import { randomIntegerInRange, sampleSize } from './util';

const WEEK = 7 * 24 * 60 * 60 * 1000;

export function getRandomRecords() {
  const numItems = randomIntegerInRange(2, 6);
  const now = Date.now();

  return Array(numItems)
    .fill(null)
    .map(_ => ({
      id: nanoid(),
      date: randomIntegerInRange(now - WEEK, now),
      symptoms: sampleSize(
        [
          {
            name: 'Fever',
            level: randomIntegerInRange(1, 3)
          },
          {
            name: 'Dry Cough',
            level: randomIntegerInRange(1, 3)
          },
          {
            name: 'Cold',
            level: randomIntegerInRange(1, 3)
          },
          {
            name: 'Difficulty Breathing',
            level: randomIntegerInRange(1, 3)
          }
        ],
        randomIntegerInRange(1, 4)
      ).sort((a, b) => b.level - a.level),
      risk: randomIntegerInRange(1, 10)
    }))
    .sort((a, b) => b.date - a.date);
}
