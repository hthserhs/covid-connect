import { AsyncStorage } from 'react-native';
import { logError } from '../util/logger';

export async function removeItems(keys: string[]) {
  return Promise.all(keys.map(removeItem));
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    logError('CLEAR_ERROR', key, e);
    throw e;
  }
}

export async function saveItem(
  key: string,
  value: string | boolean | number | object
) {
  let valueStr = typeof value === 'string' ? value : JSON.stringify(value);

  try {
    await AsyncStorage.setItem(key, valueStr);
  } catch (e) {
    logError('SAVE_ERROR', key, value, e);
    throw e;
  }
}

export async function readItem(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    logError('READ_ERROR', key, e);
    throw e;
  }
}

export function safeJsonParse<T>(value: string) {
  try {
    return JSON.parse(value) as T;
  } catch (e) {
    logError('PARSE_ERROR', e);
    return null;
  }
}
