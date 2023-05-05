export interface IGender {
  id: string;
  name: string;
}

export interface ICity {
  id: string;
  name: string;
}

export interface ISpecialty {
  id: string;
  name: string;
  params?: {
    gender?: string;
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
