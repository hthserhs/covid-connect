import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  en: {
    firstName: 'First Name',
    lastName: 'Last Name',
    gender: 'Gender',
    dob: 'Date of Birth',
    pincode: 'Current Pincode',
    saveProfile: 'Save Profile',
    date: 'Date',
    time: 'Time',
    fromLocation: 'From Location',
    toLocation: 'To Location',
    fromAirport: 'From Airport',
    toAirport: 'To Airport',
    fromStation: 'From Station',
    toStation: 'To Station',
    mode: 'Transport Mode',
    flightNumber: 'Flight Number',
    trainNumber: 'Train Number',
    busNumber: 'Bus Number',
    transportId: 'Transport Details'
  },
  'ta-IN': {
    firstName: 'முதல் பெயர்',
    lastName: 'கடைசி பெயர்',
    gender: 'பாலினம்',
    dob: 'பிறந்த தேதி',
    pincode: 'தற்போதைய பின்கோடு',
    saveProfile: 'சுயவிவரத்தை சேமிக்கவும்'
  }
};

i18n.locale = Localization.locale;

i18n.fallbacks = true;

export function t(key: string) {
  return i18n.t(key);
}
