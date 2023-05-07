import { Reducer } from 'react';

import { ICity, IDoctor, ISpecialty } from '../interfaces';

type DataProperty = ICity | ISpecialty | IDoctor;

type Action = { type: string; payload: DataProperty[] };

interface AppointmentState {
  cities: DataProperty[];
  specialties: DataProperty[];
  doctors: DataProperty[];
}

export const initialState: AppointmentState = {
  cities: [],
  specialties: [],
  doctors: [],
};

export const appointmentReducer: Reducer<AppointmentState, Action> = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'SET_CITIES':
      return { ...state, cities: action.payload };
    case 'SET_SPECIALTIES':
      return { ...state, specialties: action.payload };
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload };
    default:
      return state;
  }
};

export const setCities = (cities: ICity[]) => {
  return { type: 'SET_CITIES', payload: cities };
};
export const setSpecialties = (specialties: ISpecialty[]) => {
  return { type: 'SET_SPECIALTIES', payload: specialties };
};
export const setDoctors = (doctors: IDoctor[]) => {
  return { type: 'SET_DOCTORS', payload: doctors };
};
