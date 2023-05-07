import { useCallback } from 'react';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MuiTelInput } from 'mui-tel-input';

import { CustomSelect } from './CustomSelect/CustomSelect';
import { CITIES, DOCTORS, GENDERS, SPECIALTIES } from '../../constants';
import { initialValues, validationSchema } from '../../utils/appointmentFormConfig';
import { IAppointmentFormData } from '../../interfaces';

import styles from './AppointmentForm.module.scss';

export const AppointmentForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  const errorHandler = useCallback(
    (name: keyof IAppointmentFormData) => {
      return formik.touched[name] && formik.errors[name];
    },
    [formik.touched, formik.errors],
  );

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
        options={CITIES}
        formikProps={formik.getFieldProps('city')}
        errorHandler={errorHandler}
      />
      <CustomSelect
        title='Doctor Specialty'
        options={SPECIALTIES}
        formikProps={formik.getFieldProps('doctorSpecialty')}
        errorHandler={errorHandler}
      />
      <CustomSelect
        title='Doctor'
        options={DOCTORS}
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
        defaultCountry={'UA'}
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
