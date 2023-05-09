import { object, string } from 'yup';
import dayjs from 'dayjs';

import { IAppointmentFormData } from '../interfaces';
import { ELDER_AGE, TEEN_AGE } from '../constants';

export const initialValues: IAppointmentFormData = {
  name: '',
  birthdayDate: null,
  sex: '',
  city: '',
  doctorSpeciality: '',
  doctor: '',
  email: '',
  phoneNumber: '',
};

const contactsSchema = string().test(
  'Email or phone',
  'At least one of the email or phone is required',
  (item, testContext) => {
    return testContext.parent.email || testContext.parent.phoneNumber;
  },
);

const validateAge = (date: string | null | undefined, speciality: string) => {
  const currentDate = dayjs();
  const patientAge = currentDate.diff(date, 'year');

  if (patientAge < 0) {
    return false;
  }

  return !(
    (patientAge > TEEN_AGE && speciality === 'Pediatrician') ||
    (patientAge < ELDER_AGE && speciality === 'Geriatrician')
  );
};

export const validationSchema = object().shape({
  name: string()
    .matches(/^[aA-zZ\s]+$/, 'Only English letters are allowed')
    .min(2, 'Name must be at least 2 characters')
    .required('Required'),
  birthdayDate: string()
    .nullable()
    .required('Required')
    .test('Valid age', 'Inappropriate age for this doctor', (item, testContext) =>
      validateAge(item, testContext.parent.doctorSpeciality),
    ),
  sex: string().required('Required'),
  city: string().required('Required'),
  doctorSpeciality: string(),
  doctor: string().required('Required'),
  email: contactsSchema.email('Invalid email'),
  phoneNumber: contactsSchema
    .min(8, 'Phone number must be at least 8 digits')
    .max(18, 'Phone number must be at most 18 digits'),
});
