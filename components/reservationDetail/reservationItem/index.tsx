import Image from 'next/image';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CloseIcon from '@mui/icons-material/Close';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Grid, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { ReservationRegistration } from 'components/app/(public-user)/auth/Schema';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {
  createSubscriber,
  updateReservationItems,
  createLinkToSubscriber,
} from 'components/utils/api';
import { converTime, getTimeJP } from 'components/utils/getDay';

export interface IReservationItem {
  reservationDetail?: any;
  handleClose: () => void;
  itemId?: any;
  imageUrl?: string;
}
const ReservationItem = ({
  reservationDetail,
  handleClose,
  itemId,
  imageUrl,
}: IReservationItem) => {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingStep, setBookingStep] = useState(0);

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setBookingStep(1);
  };

  const createNewSubscriber = useCallback(
    async (name: string, email: string) => {
      try {
        const str = selectedTime;
        const strParts = str.split('_');
        const time = strParts[1];
        const timeNum = parseInt(time);
        const res = await createSubscriber(reservationDetail.reservation_id, timeNum, name, email);
        if (!res.data.error) {
          await updateReservationItems(itemId, time);
          await createLinkToSubscriber(itemId, res.data.item_id);
        }
        setBookingStep(2);
      } catch (error) {
        throw error;
      }
    },
    [selectedTime, reservationDetail?.reservation_id, itemId],
  );

  return (
    <Grid container>
      <Grid item xs={12} md={7} className='py-[60px] pl-[60px] border-r border-[#808080]'>
        <div className='flex flex-col gap-y-4'>
          <Image
            alt='image'
            width={609}
            height={0}
            src={imageUrl ?? ''}
            className='rounded-[20px]'
          />
          <div className='px-8 pr-16'>
            <p className='font-bold text-2xl mb-6'>{reservationDetail?.title}</p>
            <p className='font-bold text-2xl mb-4'>
              {reservationDetail?.recruiter.lookup_item.name}
            </p>
            <p className='text-lg mb-2'>{reservationDetail?.recruiter.lookup_item.position}</p>

            <div>
              <p className='text-sm font-normal border-t border-[#D8D8D8] pt-4'>
                {reservationDetail?.reservation_detail}
              </p>
            </div>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} md={5} className='pl-[66px] pr-[80px] pt-[60px] pb-[40px]'>
        {bookingStep === 0 && (
          <>
            <p className='font-bold text-lg my-4'>Reverse</p>
            <div className='flex items-center font-bold py-8 border-t border-b border-[#D8D8D8]'>
              <EventAvailableIcon className='inline-block mr-3' />
              <p>{getTimeJP(reservationDetail?.date)}</p>
            </div>

            <div className='mt-[40px] '>
              <p className='font-bold text-sm'>予約したい時間帯をクリックしてください。</p>
              <div className='flex flex-col gap-[15px] mt-5  items-center'>
                {reservationDetail?.time.map((t: any, index: any) => (
                  <Button
                    key={index}
                    onClick={() => handleTimeSelection(t.field_id)}
                    disabled={t.value == '0'}
                    className={`h-10 w-96 rounded-[50px] text-[#fff] font-bold ${
                      t.value == '1' ? 'bg-[#BA00FF] hover:bg-mainColor/[0.6]' : 'bg-[#F4D8FF]'
                    }`}
                  >
                    <p className='text-lg font-bold'>{converTime(t.field_id)}</p>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
        {bookingStep === 1 && (
          <>
            <div className='flex justify-between items-center'>
              <p className='font-bold text-lg my-4'>Reverse</p>
              <div
                className='cursor-pointer text-[#ba00ff] flex 
            items-center gap-[6px] hover:text-mainColor/[0.6]'
                onClick={() => setBookingStep(0)}
              >
                <AvTimerIcon />
                <p>他の時間を選ぶ</p>
              </div>
            </div>
            <div className='flex items-center font-bold py-8 border-t border-b border-[#D8D8D8]'>
              <EventAvailableIcon className='inline-block mr-3' />
              <p>
                {getTimeJP(reservationDetail?.date)}{' '}
                <span className='ml-[10px]'>{converTime(selectedTime)}</span>
              </p>
            </div>

            <div className='mt-9'>
              <p className='font-bold text-sm'>予約したい時間帯をクリックしてください。</p>
              <div className='flex flex-col gap-[15px] mt-11'>
                <Formik
                  initialValues={{
                    email: '',
                    name: '',
                  }}
                  validationSchema={ReservationRegistration}
                  onSubmit={(data) => {
                    createNewSubscriber(data.name, data.email);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    isValid,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className='relative mb-8'>
                        <TextField
                          sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                          id='name'
                          label='お名前'
                          value={values.name}
                          style={{ width: '100%' }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {touched.name && errors.name && (
                          <>
                            <ReportProblemIcon className='absolute right-3 h-6 w-6 translate-y-1/2 text-[#E5242A]' />
                            <p className='text-[#E5242A] text-xs mt-2'>お名前は必須です</p>
                          </>
                        )}
                      </div>

                      <div className='relative mb-8'>
                        <TextField
                          sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                          id='email'
                          style={{ width: '100%' }}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label='メールアドレス'
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.email && errors.email && (
                          <>
                            <ReportProblemIcon className='absolute right-3 h-6 w-6 translate-y-1/2 text-[#E5242A]' />
                            <p className='text-[#E5242A] text-xs mt-2'>
                              メールアドレスを入力してください
                            </p>
                          </>
                        )}
                      </div>

                      <Button
                        type='submit'
                        sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                        className={` text-[#fff] rounded-[50px] w-full
                        mt-5 py-3 ${
                          !isValid ? 'bg-[#E1E1E1]' : 'bg-[#BA00ff] hover:bg-[#BA00ff]/[0.6]'
                        }`}
                      >
                        <p className='font-bold text-2xl font-noto-sans-jp'>予約する</p>
                      </Button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </>
        )}

        {bookingStep === 2 && (
          <div className='flex flex-col justify-center items-center h-full'>
            <DoneIcon style={{ height: 86, width: 104, color: '#BA00FF' }} />
            <div className='mt-[74px]'>
              <p className='text-2xl font-bold'>予約が完了しました</p>
            </div>

            <div
              className='cursor-pointer text-[#ba00ff] hover:text-mainColor/[0.6] flex items-center gap-[6px] mt-14 text-sm'
              onClick={handleClose}
            >
              <AvTimerIcon />
              <p>他の時間を選ぶ</p>
            </div>
          </div>
        )}
      </Grid>

      <button onClick={handleClose} className='absolute top-5 right-5'>
        <CloseIcon className='text-[#000000]' />
      </button>
    </Grid>
  );
};
export default ReservationItem;
