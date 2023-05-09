import { useCallback, useEffect, useReducer, useState } from 'react';
import { useFormik } from 'formik';
import { Button, CircularProgress, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MuiTelInput } from 'mui-tel-input';

import { CustomSelect } from './CustomSelect/CustomSelect';
import { SuccessModal } from './SuccessModal/SuccessModal';
import { initialValues, validationSchema } from '../../utils/appointmentFormConfig';
import { IAppointmentFormData } from '../../interfaces';
import { useAppointmentQueries } from '../../hooks/useAppointmentQueries';
import {
  appointmentReducer,
  filterByFields,
  initialState,
  resetFields,
  setCities,
  setDoctors,
  setSpecialities,
} from '../../reducers/appointmentReducer';

import styles from './AppointmentForm.module.scss';

export const AppointmentForm = () => {
  const [formValues, setFormValues] = useState<IAppointmentFormData>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  const resultQueries = useAppointmentQueries();
  const [citiesQuery, specialitiesQuery, doctorsQuery] = resultQueries;
  const isLoading = resultQueries.some((query) => query.isLoading);
  const isError = resultQueries.some((query) => query.isError);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setFormValues(values);
      handleOpenModal();
      resetForm();
      dispatch(resetFields());
    },
  });

  useEffect(() => {
    if (citiesQuery.data) {
      dispatch(setCities(citiesQuery.data));
    }
  }, [citiesQuery.data]);

  useEffect(() => {
    if (specialitiesQuery.data) {
      dispatch(setSpecialities(specialitiesQuery.data));
    }
  }, [specialitiesQuery.data]);

  useEffect(() => {
    if (doctorsQuery.data) {
      dispatch(setDoctors(doctorsQuery.data));
    }
  }, [doctorsQuery.data]);

  useEffect(() => {
    dispatch(
      filterByFields({
        birthdayDate: formik.values.birthdayDate,
        sex: formik.values.sex,
        city: formik.values.city,
        doctorSpeciality: formik.values.doctorSpeciality,
        doctor: formik.values.doctor,
      }),
    );
  }, [
    formik.values.birthdayDate,
    formik.values.city,
    formik.values.doctor,
    formik.values.doctorSpeciality,
    formik.values.sex,
  ]);

  const errorHandler = useCallback(
    (name: keyof IAppointmentFormData) => {
      return formik.touched[name] && formik.errors[name];
    },
    [formik.touched, formik.errors],
  );

  const handleResetForm = () => {
    formik.resetForm();
    dispatch(resetFields());
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <h2>Something went wrong</h2>;
  }

  return (
    <>
      <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label='Name'
          variant='standard'
          helperText={errorHandler('name') || ' '}
          error={!!errorHandler('name')}
          {...formik.getFieldProps('name')}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label='Birthday Date'
            format='DD/MM/YYYY'
            disableFuture
            value={formik.values.birthdayDate}
            onChange={(value) => formik.setFieldValue('birthdayDate', value)}
            slotProps={{
              textField: {
                variant: 'standard',
                helperText: errorHandler('birthdayDate') || ' ',
                error: !!errorHandler('birthdayDate'),
              },
            }}
          />
        </LocalizationProvider>
        <CustomSelect
          title='Sex'
          options={state.filteredGenders.length ? state.filteredGenders : state.genders}
          formikProps={formik.getFieldProps('sex')}
          errorHandler={errorHandler}
        />
        <CustomSelect
          title='City'
          options={state.filteredCities.length ? state.filteredCities : state.cities}
          formikProps={formik.getFieldProps('city')}
          errorHandler={errorHandler}
        />
        <CustomSelect
          title='Doctor speciality'
          options={
            state.filteredSpecialities.length ? state.filteredSpecialities : state.specialities
          }
          formikProps={formik.getFieldProps('doctorSpeciality')}
          errorHandler={errorHandler}
        />
        <CustomSelect
          title='Doctor'
          options={state.filteredDoctors.length ? state.filteredDoctors : state.doctors}
          formikProps={formik.getFieldProps('doctor')}
          errorHandler={errorHandler}
        />
        <TextField
          fullWidth
          id='email'
          label='Email'
          type='email'
          variant='standard'
          helperText={errorHandler('email') || ' '}
          error={!!errorHandler('email')}
          {...formik.getFieldProps('email')}
        />
        <MuiTelInput
          fullWidth
          placeholder='Phone number'
          variant='standard'
          sx={{ paddingTop: '16px' }}
          value={formik.values.phoneNumber}
          onChange={(value) => formik.setFieldValue('phoneNumber', value)}
          helperText={errorHandler('phoneNumber') || ' '}
          error={!!errorHandler('phoneNumber')}
        />
        <Button
          variant='outlined'
          fullWidth
          sx={{ marginTop: '10px' }}
          type='reset'
          onClick={handleResetForm}
        >
          Reset form
        </Button>
        <Button variant='contained' fullWidth sx={{ marginTop: '10px' }} type='submit'>
          Make an appointment
        </Button>
      </form>
      {openModal && (
        <SuccessModal
          openModal={openModal}
          formValues={formValues!}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
