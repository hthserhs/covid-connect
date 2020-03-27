import {} from '../../constants/app';

export class PersonalFormValues {
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
