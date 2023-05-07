import { useCallback } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MuiTelInput } from 'mui-tel-input';

import { CustomSelect } from './CustomSelect/CustomSelect';
import { GENDERS } from '../../constants';
import { initialValues, validationSchema } from '../../utils/appointmentFormConfig';
import { IAppointmentFormData } from '../../interfaces';
import { useAppointmentQueries } from '../../hooks/useAppointmentQueries';

import styles from './AppointmentForm.module.scss';

export const AppointmentForm = () => {
  const resultQueries = useAppointmentQueries();
  const [citiesQuery, specialtiesQuery, doctorsQuery] = resultQueries;
  const isFetching = resultQueries.some((query) => query.isFetching);
  const isError = resultQueries.some((query) => query.isError);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values));
      resetForm();
    },
  });

  const errorHandler = useCallback(
    (name: keyof IAppointmentFormData) => {
      return formik.touched[name] && formik.errors[name];
    },
    [formik.touched, formik.errors],
  );

  if (isFetching) {
    return <CircularProgress />;
  }

  if (isError) {
    return <h2>Something went wrong</h2>;
  }

  return (
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
        options={GENDERS}
        formikProps={formik.getFieldProps('sex')}
        errorHandler={errorHandler}
      />
      <CustomSelect
        title='City'
        options={citiesQuery.data}
        formikProps={formik.getFieldProps('city')}
        errorHandler={errorHandler}
      />
      <CustomSelect
        title='Doctor Specialty'
        options={specialtiesQuery.data}
        formikProps={formik.getFieldProps('doctorSpecialty')}
        errorHandler={errorHandler}
      />
      <CustomSelect
        title='Doctor'
        options={doctorsQuery.data}
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
      <Button variant='contained' fullWidth sx={{ marginTop: '10px' }} type='submit'>
        Make an appointment
      </Button>
    </form>
  );
};
