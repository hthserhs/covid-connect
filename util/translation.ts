import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const en = {
  first_name: 'First Name',
  last_name: 'Last Name',
  gender: 'Gender',
  dob: 'Date of Birth',
  pincode: 'Current Pincode',
  save_profile: 'Save Profile',
  date: 'Date',
  time: 'Time',
  from_location: 'From Location',
  to_location: 'To Location',
  from_airport: 'From Airport',
  to_airport: 'To Airport',
  from_station: 'From Station',
  to_station: 'To Station',
  mode: 'Transport Mode',
  flight_number: 'Flight Number',
  train_number: 'Train Number',
  bus_number: 'Bus Number',
  transport_id: 'Transport Details',
  error_generic: 'An error occurred!',
  error_otp_validation_failed: 'OTP validation failed!',
  verify_mobile: 'Verify your mobile number',
  enter_otp: 'Enter the one time password (OTP) sent to your mobile number.',
  placeholder_enter_otp: '6 digit OTP',
  btn_submit: 'Submit',
  otp_not_received: "Didn't receive OTP?",
  otp_resend: 'Resend',
  btn_change_mobile_number: 'Change Mobile Number',
  msg_otp_sent: 'OTP sent!',
  error_otp_not_sent: 'OTP could not be sent!',
  msg_primary_home: 'Be safe. Stay safe.',
  msg_secondary_home:
    'Record your symptoms and be notified of recommendations from your healthcare providers.',
  placeholder_enter_mobile: '10 digit mobile number',
  btn_request_otp: 'Request OTP'
};

i18n.translations = {
  en,
  'ta-IN': {
    firstName: 'முதல் பெயர்',
    lastName: 'கடைசி பெயர்',
    gender: 'பாலினம்',
    dob: 'பிறந்த தேதி',
    pincode: 'தற்போதைய பின்கோடு',
    saveProfile: 'சுயவிவரத்தை சேமிக்கவும்'
  }
};

i18n.defaultLocale = 'en';

i18n.locale = Localization.locale;

i18n.fallbacks = true;

export type TextKey = keyof typeof en;

export function text(key: TextKey) {
  return i18n.t(key);
}
