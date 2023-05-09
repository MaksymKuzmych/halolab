import { Reducer } from 'react';
import dayjs from 'dayjs';

import { IAppointmentFormData, ICity, IDoctor, IGender, ISpeciality } from '../interfaces';
import { GENDERS } from '../constants';
import { ActionType } from '../enums';
import {
  filterCitiesByDoctors,
  filterDoctorsByCity,
  filterDoctorsBySpecialities,
  filterGendersBySpecialities,
  filterSpecialitiesByAge,
  filterSpecialitiesByDoctors,
  filterSpecialitiesBySex,
} from '../utils/filterFormFields';

type Action =
  | { type: ActionType.SET_CITIES; payload: ICity[] }
  | { type: ActionType.SET_SPECIALITIES; payload: ISpeciality[] }
  | { type: ActionType.SET_DOCTORS; payload: IDoctor[] }
  | { type: ActionType.FILTER_BY_FIELDS; payload: Partial<IAppointmentFormData> }
  | { type: ActionType.RESET_FIELDS };

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
    case ActionType.SET_CITIES:
      return { ...state, cities: action.payload, filteredCities: action.payload };
    case ActionType.SET_SPECIALITIES:
      return { ...state, specialities: action.payload, filteredSpecialities: action.payload };
    case ActionType.SET_DOCTORS:
      return { ...state, doctors: action.payload, filteredDoctors: action.payload };
    case ActionType.FILTER_BY_FIELDS:
      const { birthdayDate, sex, city, doctorSpeciality, doctor } = action.payload;
      let filteredGenders = [...state.genders];
      let filteredCities = [...state.cities];
      let filteredSpecialities = [...state.specialities];
      let filteredDoctors = [...state.doctors];

      if (birthdayDate) {
        const currentDate = dayjs();
        const patientAge = currentDate.diff(birthdayDate, 'year');

        filteredSpecialities = filterSpecialitiesByAge(filteredSpecialities, patientAge);
        filteredGenders = filterGendersBySpecialities(filteredGenders, filteredSpecialities);
        filteredDoctors = filterDoctorsBySpecialities(filteredDoctors, filteredSpecialities);
        filteredCities = filterCitiesByDoctors(filteredCities, filteredDoctors);
      }

      if (sex) {
        filteredSpecialities = filterSpecialitiesBySex(filteredSpecialities, sex);
        filteredDoctors = filterDoctorsBySpecialities(filteredDoctors, filteredSpecialities);
        filteredCities = filterCitiesByDoctors(filteredCities, filteredDoctors);
      }

      if (city) {
        const currectCity = filteredCities.filter((filteredCity) => filteredCity.name === city);

        filteredDoctors = filterDoctorsByCity(filteredDoctors, currectCity);
        filteredSpecialities = filterSpecialitiesByDoctors(filteredSpecialities, filteredDoctors);
        filteredGenders = filterGendersBySpecialities(filteredGenders, filteredSpecialities);
      }

      if (doctorSpeciality) {
        const currectSpeciality = filteredSpecialities.filter(
          (filteredDoctorSpeciality) => filteredDoctorSpeciality.name === doctorSpeciality,
        );

        filteredGenders = filterGendersBySpecialities(filteredGenders, currectSpeciality);
        filteredDoctors = filterDoctorsBySpecialities(filteredDoctors, currectSpeciality);
        filteredCities = filterCitiesByDoctors(filteredCities, filteredDoctors);
      }

      if (doctor) {
        const currentDoctor = filteredDoctors.filter(
          (filteredDoctor) => `${filteredDoctor.name} ${filteredDoctor.surname}` === doctor,
        );

        filteredCities = filterCitiesByDoctors(filteredCities, currentDoctor);
        filteredSpecialities = filterSpecialitiesByDoctors(filteredSpecialities, currentDoctor);
        filteredGenders = filterGendersBySpecialities(filteredGenders, filteredSpecialities);
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
        filteredGenders: state.genders,
        filteredSpecialities: state.specialities,
        filteredDoctors: state.doctors,
        filteredCities: state.cities,
      };
    default:
      return state;
  }
};

export const setCities = (cities: ICity[]): Action => {
  return { type: ActionType.SET_CITIES, payload: cities };
};

export const setSpecialities = (specialities: ISpeciality[]): Action => {
  return { type: ActionType.SET_SPECIALITIES, payload: specialities };
};

export const setDoctors = (doctors: IDoctor[]): Action => {
  return { type: ActionType.SET_DOCTORS, payload: doctors };
};

export const filterByFields = (value: Partial<IAppointmentFormData>): Action => {
  return { type: ActionType.FILTER_BY_FIELDS, payload: value };
};

export const resetFields = (): Action => {
  return { type: ActionType.RESET_FIELDS };
};
