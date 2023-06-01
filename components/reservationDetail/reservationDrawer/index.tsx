import { Drawer, Button, TextField } from '@mui/material';
import { TFieldValueConvert } from 'components/types/common';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DoneIcon from '@mui/icons-material/Done';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import {
  getItemDetails,
  updateReservationItems,
  createLinkToSubscriber,
} from 'components/utils/api';
import { converTime, getTimeJP } from 'components/utils/getDay';
import { createSubscriber } from 'components/utils/api';
import { Formik } from 'formik';
import { ReservationRegistration } from 'components/app/(public-user)/auth/Schema';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
export interface IReservationDrawer {
  reservationDetail?: any;
  handleClose: () => void;
  showDrawer: boolean;
  itemId: string;
  imageUrl?: string;
}
const ReservationDrawer = ({
  reservationDetail,
  handleClose,
  showDrawer,
  itemId,
  imageUrl,
}: IReservationDrawer) => {
  const [tab, setTab] = useState(false);
  const [reservationInfo, setReservationInfor] = useState<TFieldValueConvert>();
  const handleChangeStatusTab = () => {
    setTab(false);
  };
  const handleChangeTab = () => {
    setTab(true);
  };

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
        const timeNum = parseInt(strParts[1]);
        const res = await createSubscriber(reservationDetail.reservation_id, timeNum, name, email);
        if (!res.data.error) {
          await createLinkToSubscriber(itemId, res.data.item_id);
          await updateReservationItems(itemId, time);
        }
        setBookingStep(2);
      } catch (error) {
        throw error;
      }
    },
    [selectedTime, reservationDetail?.reservation_id, itemId],
  );

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
    <>
      <Drawer
        anchor='right'
        open={showDrawer}
        onClose={handleClose}
        PaperProps={{
          style: { width: '100%' },
        }}
      >
        <div className='py-5 px-[10px] gap-[7px] flex'>
          <div onClick={() => handleClose()} className='flex items-center gap-[6px]'>
            <ArrowBackIcon />
            <p>戻る</p>
          </div>
        </div>
        <div className='flex flex-col  px-5 pt-5 pb-[134px] gap-4'>
          <Image
            alt='image'
            src={imageUrl ?? ''}
            width={353}
            height={236}
            className='rounded-[20px]'
          />

          <div className='pb-[10px] flex gap-[10px]'>
            <p>{reservationInfo?.title}</p>
          </div>

          <p className='font-bold text-2xl'>{reservationInfo?.recruiter.lookup_item.name}</p>

          <p className='text-lg'>{reservationInfo?.recruiter.lookup_item.position}</p>

          <div className='flex py-6 px-[10px] gap-[10px] border border-solid border-[#E1E1E1]'>
            <EventAvailableIcon />
            <p>{getTimeJP(reservationInfo?.date)}</p>
          </div>

          <div className='flex gap-[11px] border-b border-solid border-b-[#E1E1E1]'>
            <div
              onClick={() => handleChangeStatusTab()}
              className={`flex w-1/2 justify-center items-end px-[5px] py-[10px] 
            border-solid  gap-[10px] ${!tab ? 'border-b border-b-mainColor text-mainColor ' : ''}`}
            >
              <p className='text-base font-bold'>予約</p>
            </div>

            <div
              onClick={() => handleChangeTab()}
              className={`flex w-1/2 justify-center items-end px-[5px] py-[10px] 
            border-solid  gap-[10px] ${tab ? 'border-b border-b-mainColor text-mainColor ' : ''}`}
            >
              <p className='text-base font-bold'>予約概要</p>
            </div>
          </div>

          <div className='flex flex-col '>
            {tab ? (
              <p className='text-sm'>{reservationInfo?.reservation_detail}</p>
            ) : (
              <>
                {bookingStep === 0 && (
                  <>
                    <div className='mt-[20px] '>
                      <p className='font-bold text-sm'>予約したい時間帯をクリックしてください。</p>
                      <div className='flex flex-col gap-[15px] mt-5  items-center'>
                        {reservationInfo &&
                          reservationInfo?.time.map((t: any, index: any) => (
                            <Button
                              key={index}
                              onClick={() => handleTimeSelection(t.field_id)}
                              disabled={t.value == '0'}
                              className={` w-full rounded-[50px] text-[#fff] font-bold ${
                                t.value == '1'
                                  ? 'bg-[#BA00FF] hover:bg-[#BA00FF]'
                                  : 'bg-[#F4D8FF] hover:bg-[#BA00FF]'
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
                    <div className='flex flex-col gap-4 p-5'>
                      <div className='flex justify-center'>
                        <div className='flex justify-between items-center gap-4'>
                          <div
                            onClick={() => setBookingStep(0)}
                            className='flex items-center gap-[3px]'
                          >
                            <AvTimerIcon />
                            <p className='text-sm font-bold text-[#ba00ff]'>他の時間を選ぶ</p>
                          </div>
                        </div>
                      </div>

                      <div className='flex py-6 px-[10px] gap-[10px] border-t border-b border-solid border-[#e1e1e1] font-bold text-lg'>
                        <EventAvailableIcon />
                        <p>{getTimeJP(reservationInfo?.date)}</p>
                        <p>{converTime(reservationInfo?.field_id)}</p>
                      </div>

                      <div className='flex pt-5 pb-[10px] gap-[10px]'>
                        <p className='font-bold text-sm'>
                          全ての項目を記入して予約ボタンを押してください。
                        </p>
                      </div>
                    </div>

                    <Formik
                      initialValues={{
                        name: '',
                        email: '',
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
                          <div className='flex flex-col items-center gap-8'>
                            <div className='relative'>
                              <TextField
                                sx={{ fontFamily: 'Noto Sans JP, sans-serif', width: '100%' }}
                                id='name'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label='お名前*'
                                InputLabelProps={{
                                  shrink: true,
                                  style: { fontWeight: '400', fontSize: '12px', color: '#ba00ff' },
                                }}
                              />
                              {touched.name && errors.name && (
                                <>
                                  <ReportProblemIcon className='absolute right-3 h-6 w-6 translate-y-1/2 text-[#E5242A]' />
                                  <p className='text-[#E5242A] text-xs mt-2'>お名前を入力してください</p>
                                </>
                              )}
                            </div>

                            <div className='relative'>
                              <TextField
                                sx={{ fontFamily: 'Noto Sans JP, sans-serif', width: '100%' }}
                                id='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label='メールアドレス*'
                                InputLabelProps={{
                                  shrink: true,
                                  style: {
                                    fontWeight: '400',
                                    fontSize: '12px',
                                    color: '#ba00ff',
                                    borderColor: '#ba00ff',
                                  },
                                }}
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
                              sx={{ fontFamily: 'Noto Sans JP, sans-serif', width: '100%' }}
                              className={`text-[#fff] rounded-[50px] mt-5 py-3 ${
                                !isValid ? 'bg-[#E1E1E1]' : 'bg-[#BA00ff] hover:bg-[#BA00ff]/[0.6]'
                              }`}
                            >
                              <p className='font-bold text-2xl font-noto-sans-jp'>予約する</p>
                            </Button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </>
                )}

                {bookingStep === 2 && (
                  <div className='flex flex-col justify-center items-center h-full'>
                    <DoneIcon style={{ height: 86, width: 104, color: '#BA00FF' }} />
                    <div className='mt-[74px]'>
                      <p className='text-2xl font-bold'>予約が完了しました</p>
                    </div>

                    <div
                      className='cursor-pointer text-[#ba00ff] flex items-center gap-[6px] mt-14 text-sm'
                      onClick={() => setBookingStep(0)}
                    >
                      <AvTimerIcon />
                      <p>他の時間を選ぶ</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ReservationDrawer;
