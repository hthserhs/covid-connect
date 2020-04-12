import { text } from '../util/translation';
import api from './client';
import { ValidateOtpResponse } from './types';

export async function sendOtpToNumber(number: string) {
  await api('otp', {
    params: {
      number,
      role: 'Patient'
    }
  });
}

export async function validateOtp(number: string, otp: string) {
  return api
    .post<ValidateOtpResponse>('login', {
      number,
      otp,
      role: 'Patient'
    })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e.response);
      throw Error(text('error_otp_validation_failed'));
    });
}
