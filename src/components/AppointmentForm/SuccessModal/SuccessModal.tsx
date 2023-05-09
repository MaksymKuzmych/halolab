import { memo } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

import { IAppointmentFormData } from '../../../interfaces';

import styles from './SuccessModal.module.scss';

interface ISuccessModalProps {
  openModal: boolean;
  formValues: IAppointmentFormData;
  handleCloseModal: () => void;
}

export const SuccessModal = memo(
  ({
    openModal,
    formValues: { name, birthdayDate, sex, city, doctorSpeciality, doctor, email, phoneNumber },
    handleCloseModal,
  }: ISuccessModalProps) => {
    return (
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className={styles.modalContent}>
          <h3>YOUR DATA HAS BEEN SENT</h3>
          <h4>NAME</h4>
          <p>{name}</p>
          <h4>BIRTHDAY DATE</h4>
          <p>{birthdayDate?.format('DD/MM/YYYY')}</p>
          <h4>SEX</h4>
          <p>{sex}</p>
          <h4>CITY</h4>
          <p>{city}</p>
          <h4>DOCTOR SPECIALITY</h4>
          <p>{doctorSpeciality}</p>
          <h4>DOCTOR</h4>
          <p>{doctor}</p>
          <h4>EMAIL</h4>
          <p>{email}</p>
          <h4>PHONE NUMBER</h4>
          <p>{phoneNumber}</p>
          <Button variant='outlined' onClick={handleCloseModal}>
            Back to the main page
          </Button>
        </Box>
      </Modal>
    );
  },
);
