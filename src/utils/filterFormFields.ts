import { Gender } from '../enums';
import { ICity, IDoctor, IGender, ISpeciality } from '../interfaces';

// Genders

export const filterGendersBySpecialities = (genders: IGender[], specialities: ISpeciality[]) => {
  return genders.filter((gender) => {
    return specialities.some((speciality) => speciality.params?.gender === gender.name);
  });
};

// Cities

export const filterCitiesByDoctors = (cities: ICity[], doctors: IDoctor[]) => {
  return cities.filter((city) => {
    return doctors.some((doctor) => doctor.cityId === city.id);
  });
};

// Specialities

export const filterSpecialitiesByAge = (specialities: ISpeciality[], patientAge: number) => {
  return specialities.filter((speciality) => {
    if (speciality.params?.maxAge) {
      return patientAge < speciality.params?.maxAge;
    }
    if (speciality.params?.minAge) {
      return patientAge > speciality.params?.minAge;
    }
    return true;
  });
};

export const filterSpecialitiesBySex = (specialities: ISpeciality[], sex: string) => {
  return specialities.filter((speciality) => {
    if (sex === Gender.MALE) {
      return speciality.params?.gender !== Gender.FEMALE;
    }
    if (sex === Gender.FEMALE) {
      return speciality.params?.gender !== Gender.MALE;
    }
    return true;
  });
};

export const filterSpecialitiesByDoctors = (specialities: ISpeciality[], doctors: IDoctor[]) => {
  return specialities.filter((speciality) => {
    return doctors.some((doctor) => doctor.specialityId === speciality.id);
  });
};

// Doctors

export const filterDoctorsByCity = (doctors: IDoctor[], city: ICity) => {
  return doctors.filter((doctor) => doctor.cityId === city.id);
};

export const filterDoctorsBySpecialities = (doctors: IDoctor[], specialities: ISpeciality[]) => {
  return doctors.filter((doctor) => {
    return specialities.some((speciality) => speciality.id === doctor.specialityId);
  });
};
