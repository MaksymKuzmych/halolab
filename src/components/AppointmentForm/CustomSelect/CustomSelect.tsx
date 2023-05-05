import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { ICity, IDoctor, IGender, ISpecialty } from '../../../interfaces';

type SelectOptions = (IGender | ICity | ISpecialty | IDoctor)[];

interface ICustomSelectProps {
  name: string;
  options: SelectOptions;
}

export const CustomSelect = ({ name, options }: ICustomSelectProps) => {
  const optionsLayout = () => {
    return options.map((option) => {
      const { id, name } = option;
      return (
        <MenuItem value={name} key={id}>
          {name}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl variant='standard' fullWidth>
      <InputLabel id={`${name}Label`}>{name}</InputLabel>
      <Select labelId={`${name}Label`} id={name} value={''} onChange={() => {}} label={name}>
        {optionsLayout()}
      </Select>
    </FormControl>
  );
};
