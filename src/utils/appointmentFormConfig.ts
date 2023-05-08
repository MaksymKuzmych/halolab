import { object, string } from 'yup';

import { IAppointmentFormData } from '../interfaces';

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

export const validationSchema = object().shape({
  name: string()
    .matches(/^[aA-zZ\s]+$/, 'Only english letters are allowed')
    .min(2, 'Name must be at least 2 characters')
    .required(`${'Required'}`),
  birthdayDate: string().required(`${'Required'}`),
  sex: string().required(`${'Required'}`),
  city: string().required(`${'Required'}`),
  doctor: string().required(`${'Required'}`),
  email: contactsSchema.email('Invalid email'),
  phoneNumber: contactsSchema
    .min(8, 'Phone number must be at least 8 digits')
    .max(18, 'Phone number must be at most 18 digits'),
});
