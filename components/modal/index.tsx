'use client'
import { makeStyles } from '@material-ui/core';
import { Box, Modal, } from "@mui/material";
import { TJob } from "components/types/common";
import { useState } from "react";
import ReservationItem from '../reservationDetail/reservationItem';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '49.5%',
  transform: 'translate(-50%, -50%)',
  width: 1248,
  bgcolor: '#FFFFFF',
  boxShadow: 24,
  notchedOutline: {
    borderColor: 'red',
  },
};

const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ba00ff',
    },
  },
});

export interface IChildModel {
  open: boolean;
  handleClose: () => void;
  jobDetail?: TJob;
}

const ChildModel = ({ open, handleClose, jobDetail }: IChildModel) => {
  const [bookingStep, setBookingStep] = useState(0);

  return (
    <Modal open={open} onClose={() => {
      handleClose();
      setBookingStep(0)
    }}>
      <>
        <div className="modal-body">
          <Box sx={{ ...style, width: 1248, borderRadius: '20px', }}>
            <ReservationItem jobDetail={jobDetail} handleClose={handleClose} />
          </Box>
        </div></>
    </Modal>
  )
}

export default ChildModel