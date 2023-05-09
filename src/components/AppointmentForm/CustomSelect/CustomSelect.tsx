import { memo, useEffect, useMemo } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { FieldInputProps } from 'formik';

import { IAppointmentFormData, ICity, IDoctor, IGender, ISpeciality } from '../../../interfaces';

import styles from './CustomSelect.module.scss';

type SelectOptions = (IGender | ICity | ISpeciality | IDoctor)[];

interface ICustomSelectProps {
  title: string;
  options: SelectOptions;
  formikProps: FieldInputProps<string>;
  errorHandler: (name: keyof IAppointmentFormData) => string | false | undefined;
}

export const CustomSelect = memo(
  ({ title, options, formikProps, errorHandler }: ICustomSelectProps) => {
    const { onChange } = formikProps;
    const error = errorHandler(formikProps.name as keyof IAppointmentFormData);
    const optionsLayout = useMemo(() => {
      return options.map((option) => {
        const { id, name } = option;
        let surname = null;

        if ('surname' in option) {
          surname = option.surname;
        }

        const value = surname ? `${name} ${surname}` : name;

        return (
          <MenuItem value={value} key={id}>
            {value}
          </MenuItem>
        );
      });
    }, [options]);

    useEffect(() => {
      if (options.length === 1) {
        const currentOption = options[0];
        const { name } = currentOption;
        let surname = null;

        if ('surname' in currentOption) {
          surname = currentOption.surname;
        }

        const value = surname ? `${name} ${surname}` : name;

        if (formikProps.value !== value) {
          onChange({
            target: {
              name: formikProps.name,
              value: value,
            },
          });
        }
      }
    }, [formikProps.name, formikProps.value, onChange, options]);

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
