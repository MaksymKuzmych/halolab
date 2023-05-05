import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MuiTelInput } from 'mui-tel-input';

import styles from './AppointmentForm.module.scss';
import { CustomSelect } from './CustomSelect/CustomSelect';
import { CITIES, DOCTORS, GENDERS, SPECIALTY } from '../../constants';

export const AppointmentForm = () => {
  return (
    <form className={styles.wrapper} onSubmit={() => {}} autoComplete='off'>
      <TextField id='name' label='Name' variant='standard' fullWidth />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Birthday Date'
          format='DD/MM/YYYY'
          slotProps={{ textField: { fullWidth: true, variant: 'standard' } }}
        />
      </LocalizationProvider>
      <CustomSelect name='Sex' options={GENDERS} />
      <CustomSelect name='City' options={CITIES} />
      <CustomSelect name='Doctor Specialty' options={SPECIALTY} />
      <CustomSelect name='Doctor' options={DOCTORS} />
      <TextField id='email' label='Email' type={'email'} variant='standard' fullWidth />
      <MuiTelInput
        value={''}
        onChange={() => {}}
        placeholder='Phone number'
        fullWidth
        variant='standard'
        defaultCountry={'UA'}
        sx={{ paddingTop: '16px' }}
      />
      <Button
        variant='outlined'
        onClick={() => {}}
        fullWidth
        sx={{ marginTop: '10px' }}
        type='submit'
      >
        Make an appointment
      </Button>
    </form>
  );
};
