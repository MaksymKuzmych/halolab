import { object, string } from 'yup';

import { IAppointmentFormData } from '../interfaces';

export const initialValues: IAppointmentFormData = {
  name: '',
  birthdayDate: null,
  sex: '',
  city: '',
  doctorSpecialty: '',
  doctor: '',
  email: '',
  phoneNumber: '',
};

const contactSchema = string().test(
  'Email or phone',
  'At least one of the email or phone is required',
  (item, testContext) => {
    return testContext.parent.email || testContext.parent.phoneNumber;
  },
);

export const validationSchema = object().shape({
  name: string()
    .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field')
    .min(2, 'Name must be at least 2 characters')
    .required(`${'Required'}`),
  birthdayDate: string().required(`${'Required'}`),
  sex: string().required(`${'Required'}`),
  city: string().required(`${'Required'}`),
  doctor: string().required(`${'Required'}`),
  email: contactSchema.email('Invalid email'),
  phoneNumber: contactSchema.max(18, 'Phone number must be at most 18 digits'),
});
