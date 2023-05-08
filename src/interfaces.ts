import { Dayjs } from 'dayjs';

import { Genders } from './enums';

export interface IGender {
  id: string;
  name: Genders.MALE | Genders.FEMALE;
}

export interface ICity {
  id: string;
  name: string;
}

export interface ISpeciality {
  id: string;
  name: string;
  params?: {
    gender?: Genders.MALE | Genders.FEMALE;
    maxAge?: number;
    minAge?: number;
  };
}

export interface IDoctor {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
}

export interface IAppointmentFormData {
  name: string;
  birthdayDate: Dayjs | null;
  sex: string;
  city: string;
  doctorSpeciality: string;
  doctor: string;
  email: string;
  phoneNumber: string;
}
