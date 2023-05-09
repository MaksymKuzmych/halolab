import { Gender } from './enums';
import { IGender } from './interfaces';

export const CITIES_API_URL = 'https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4';
export const SPECIALITIES_API_URL = 'https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca';
export const DOCTORS_API_URL = 'https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21';

export const GENDERS: IGender[] = [
  { id: '1', name: Gender.MALE },
  { id: '2', name: Gender.FEMALE },
];

export const TEEN_AGE = 16;
export const ELDER_AGE = 45;
