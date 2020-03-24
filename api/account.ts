import api from './client';
import { ValidateOtpResponse } from './types';

export async function sendOtpToNumber(number: string) {
  await api('otp', {
    params: {
      number
    }
  });
}

export async function validateOtp(number: string, otp: string) {
  return api
    .post<ValidateOtpResponse>('login', {
      number,
      otp
    })
    .then(res => res.data);
}
