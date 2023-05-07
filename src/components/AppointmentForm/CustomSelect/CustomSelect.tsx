import { memo, useMemo } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { FieldInputProps } from 'formik';

import { IAppointmentFormData, ICity, IDoctor, IGender, ISpecialty } from '../../../interfaces';

import styles from './CustomSelect.module.scss';

type SelectOptions = (IGender | ICity | ISpecialty | IDoctor)[];

interface ICustomSelectProps {
  title: string;
  options: SelectOptions;
  formikProps: FieldInputProps<string>;
  errorHandler: (name: keyof IAppointmentFormData) => string | false | undefined;
}

export const CustomSelect = memo(
  ({ title, options, formikProps, errorHandler }: ICustomSelectProps) => {
    const error = errorHandler(formikProps.name as keyof IAppointmentFormData);
    const optionsLayout = useMemo(() => {
      return options.map((option) => {
        const { id, name } = option;
        let surname = null;

        if ('surname' in option) {
          surname = option.surname;
        }

        const value = surname ? `${surname} ${name}` : name;

        return (
          <MenuItem value={value} key={id}>
            {value}
          </MenuItem>
        );
      });
    }, [options]);

    return (
      <FormControl fullWidth variant='standard' error={!!error}>
        <InputLabel id={`${title}Label`}>{title}</InputLabel>
        <Select labelId={`${title}Label`} id={title} label={title} {...formikProps}>
          {optionsLayout}
        </Select>
        <FormHelperText className={styles.error}>{error || ' '}</FormHelperText>
      </FormControl>
    );
  },
);
