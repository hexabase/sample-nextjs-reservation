'use client';

import { Box, Modal } from '@mui/material';
import { TFieldValueConvert, TReservationRespond } from 'components/types/common';
import { getItemDetails } from 'components/utils/api';
import { useEffect, useState } from 'react';
import ReservationItem from '../reservationDetail/reservationItem';

const style = {
  position: 'absolute' as const,
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

export interface IChildModel {
  open: boolean;
  handleClose: () => void;
  reservationDetail?: TReservationRespond;
  imageUrl?: string;
}

const ChildModel = ({ open, handleClose, reservationDetail, imageUrl }: IChildModel) => {
  const [bookingStep, setBookingStep] = useState(0);
  const [reservationInfo, setReservationInfor] = useState<TFieldValueConvert>();

  useEffect(() => {
    const getItemData = async () => {
      const res = await getItemDetails(reservationDetail?.i_id);
      const times: { field_id: string; value: string }[] = [];

      if (res.data && res.data.field_values) {
        const dataConvert: TFieldValueConvert = {};
        for (const item in res.data.field_values) {
          if (item.startsWith('time')) {
            times?.push({
              field_id: res.data.field_values[item].field_id,
              value: res.data.field_values[item].value,
            });
            dataConvert['time'] = times;
          } else {
            dataConvert[res.data.field_values[item].field_id] = res.data.field_values[item].value;
          }
        }

        setReservationInfor(dataConvert);
      }
    };
    getItemData();
  }, [reservationDetail?.i_id]);

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setBookingStep(0);
      }}
    >
      <>
        <div className='modal-body'>
          <Box sx={{ ...style, width: 1248, borderRadius: '20px' }}>
            <ReservationItem
              reservationDetail={reservationInfo}
              handleClose={handleClose}
              imageUrl={imageUrl}
            />
          </Box>
        </div>
      </>
    </Modal>
  );
};

export default ChildModel;
