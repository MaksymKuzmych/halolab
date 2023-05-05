import { ICity, IDoctor, IGender, ISpecialty } from './interfaces';

export const CITY_API_URL = 'https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4';
export const SPECIALTY_API_URL = 'https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca';
export const DOCTORS_API_URL = 'https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca';

export const GENDERS: IGender[] = [
  { id: '1', name: 'Male' },
  { id: '2', name: 'Female' },
];

export const CITIES: ICity[] = [
  {
    id: '1',
    name: 'Kyiv',
  },
  {
    id: '2',
    name: 'Kharkiv',
  },
];

export const SPECIALTY: ISpecialty[] = [
  {
    id: '1',
    name: 'Therapist',
  },
  {
    id: '2',
    name: 'Mammologist',
    params: {
      gender: 'Female',
    },
  },
];

export const DOCTORS: IDoctor[] = [
  {
    id: '1',
    name: 'Aleks',
    surname: 'Dyatloff',
    specialityId: '6',
    isPediatrician: true,
    cityId: '3',
  },
  {
    id: '2',
    name: 'Asya',
    surname: 'Plachkova',
    specialityId: '5',
    isPediatrician: true,
    cityId: '3',
  },
];
