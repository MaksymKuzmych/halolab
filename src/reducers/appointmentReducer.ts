import { Reducer } from 'react';
import dayjs from 'dayjs';

import { IAppointmentFormData, ICity, IDoctor, IGender, ISpeciality } from '../interfaces';
import { GENDERS } from '../constants';
import { Genders } from '../enums';

type Action =
  | { type: 'SET_CITIES'; payload: ICity[] }
  | { type: 'SET_SPECIALITIES'; payload: ISpeciality[] }
  | { type: 'SET_DOCTORS'; payload: IDoctor[] }
  | { type: 'FILTER_BY_FIELDS'; payload: Partial<IAppointmentFormData> }
  | { type: 'RESET_FIELDS' };

interface AppointmentState {
  genders: IGender[];
  filteredGenders: IGender[];
  cities: ICity[];
  filteredCities: ICity[];
  specialities: ISpeciality[];
  filteredSpecialities: ISpeciality[];
  doctors: IDoctor[];
  filteredDoctors: IDoctor[];
}

export const initialState: AppointmentState = {
  genders: GENDERS,
  filteredGenders: [],
  cities: [],
  filteredCities: [],
  specialities: [],
  filteredSpecialities: [],
  doctors: [],
  filteredDoctors: [],
};

export const appointmentReducer: Reducer<AppointmentState, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'SET_CITIES':
      return { ...state, cities: action.payload };
    case 'SET_SPECIALITIES':
      return { ...state, specialities: action.payload };
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload };
    case 'FILTER_BY_FIELDS':
      const { birthdayDate, sex, city, doctorSpeciality, doctor } = action.payload;
      let filteredGenders = [...state.genders];
      let filteredCities = [...state.cities];
      let filteredSpecialities = [...state.specialities];
      let filteredDoctors = [...state.doctors];

      if (birthdayDate) {
        const currentDate = dayjs();
        const diffYears = currentDate.diff(birthdayDate, 'year');

        filteredSpecialities = filteredSpecialities.filter((speciality) => {
          if (speciality.params?.maxAge) {
            return diffYears < speciality.params?.maxAge;
          }
          if (speciality.params?.minAge) {
            return diffYears > speciality.params?.minAge;
          }
          return true;
        });
        filteredGenders = filteredGenders.filter((gender) => {
          return filteredSpecialities.some(
            (speciality) => speciality.params?.gender === gender.name,
          );
        });
        filteredDoctors = filteredDoctors.filter((doctor) => {
          return filteredSpecialities.some((speciality) => speciality.id === doctor.specialityId);
        });
        filteredCities = filteredCities.filter((city) => {
          return filteredDoctors.some((doctor) => doctor.cityId === city.id);
        });
      }

      if (sex) {
        filteredSpecialities = filteredSpecialities.filter((speciality) => {
          if (sex === Genders.MALE) {
            return speciality.params?.gender !== Genders.FEMALE;
          }
          if (sex === Genders.FEMALE) {
            return speciality.params?.gender !== Genders.MALE;
          }
          return true;
        });
        filteredDoctors = filteredDoctors.filter((doctor) => {
          return filteredSpecialities.some((speciality) => speciality.id === doctor.specialityId);
        });
        filteredCities = filteredCities.filter((city) => {
          return filteredDoctors.some((doctor) => doctor.cityId === city.id);
        });
      }

      if (city) {
        const currectCity = filteredCities.find((filteredCity) => filteredCity.name === city);
        const cityId = currectCity?.id;

        filteredDoctors = filteredDoctors.filter((doctor) => doctor.cityId === cityId);
        filteredSpecialities = filteredSpecialities.filter((speciality) => {
          return filteredDoctors.some((doctor) => doctor.specialityId === speciality.id);
        });
        filteredGenders = filteredGenders.filter((gender) => {
          return filteredSpecialities.some(
            (speciality) => speciality.params?.gender === gender.name,
          );
        });
      }

      if (doctorSpeciality) {
        const currectSpeciality = filteredSpecialities.find(
          (filteredDoctorSpeciality) => filteredDoctorSpeciality.name === doctorSpeciality,
        );
        const currectSpecialityId = currectSpeciality?.id;
        filteredGenders = filteredGenders.filter((gender) => {
          return currectSpeciality?.params?.gender === gender.name;
        });
        filteredDoctors = filteredDoctors.filter(
          (doctor) => doctor.specialityId === currectSpecialityId,
        );
        filteredCities = filteredCities.filter((city) => {
          return filteredDoctors.some((doctor) => doctor.cityId === city.id);
        });
      }

      if (doctor) {
        const currentDoctor = filteredDoctors.find(
          (filteredDoctor) => `${filteredDoctor.name} ${filteredDoctor.surname}` === doctor,
        );

        filteredCities = filteredCities.filter((city) => currentDoctor?.cityId === city.id);
        filteredSpecialities = filteredSpecialities.filter(
          (speciality) => currentDoctor?.specialityId === speciality.id,
        );
        filteredGenders = filteredGenders.filter((gender) => {
          return filteredSpecialities.some(
            (speciality) => speciality.params?.gender === gender.name,
          );
        });
      }
      return {
        ...state,
        filteredGenders,
        filteredSpecialities,
        filteredDoctors,
        filteredCities,
      };
    case 'RESET_FIELDS':
      return {
        ...state,
        filteredGenders: [],
        filteredSpecialities: [],
        filteredDoctors: [],
        filteredCities: [],
      };
    default:
      return state;
  }
};

export const setCities = (cities: ICity[]): Action => {
  return { type: 'SET_CITIES', payload: cities };
};

export const setSpecialities = (specialities: ISpeciality[]): Action => {
  return { type: 'SET_SPECIALITIES', payload: specialities };
};

export const setDoctors = (doctors: IDoctor[]): Action => {
  return { type: 'SET_DOCTORS', payload: doctors };
};

export const filterByFields = (value: Partial<IAppointmentFormData>): Action => {
  return { type: 'FILTER_BY_FIELDS', payload: value };
};

export const resetFields = (): Action => {
  return { type: 'RESET_FIELDS' };
};
