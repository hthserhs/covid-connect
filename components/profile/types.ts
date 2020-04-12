import {} from '../../constants/app';

export class PersonalFormState {
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date;
  pincode: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.gender = '';
    this.dob = null;
    this.pincode = '';
  }
}

export class QuarantineFormState {
  home: boolean;
  completed: boolean;
  start: null | Date;
  end: null | Date;
  locationId: number;

  constructor() {
    this.home = true;
    this.completed = false;
    this.start = null;
    this.end = null;
    this.locationId = 0;
  }
}
