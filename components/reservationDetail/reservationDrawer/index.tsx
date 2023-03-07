import { Drawer, Button, TextField } from '@mui/material';
import { TJob } from 'components/types/common';
import ReservationItem from '../reservationItem';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DoneIcon from '@mui/icons-material/Done';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useState } from 'react';
export interface IReservationDrawer {
  jobDetail?: TJob,
  handleClose: () => void,
  showDrawer: boolean,
}
const ReservationDrawer = ({ jobDetail, handleClose, showDrawer }: IReservationDrawer) => {
  const [tab, setTab] = useState(false)
  const handleChangeStatusTab = () => {
    setTab(false)
  }
  const handleChangeTab = () => {
    setTab(true)

  }
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingStep, setBookingStep] = useState(0);
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setBookingStep(1);
  };
  return (
    <div>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={handleClose}
        PaperProps={
          {
            style: { width: '100%' },
          }
        }
      >
        <div className='py-5 px-[10px] gap-[7px] flex'>
          <div
            onClick={() => handleClose()}
            className='flex items-center gap-[6px]'>
            <ArrowBackIcon />
            <p>戻る</p>
          </div>
        </div>
        <div className='flex flex-col  px-5 pt-5 pb-[134px] gap-4'>
          <Image alt='image' src='/work.svg' width={353} height={236} className='rounded-[20px]' />

          <div className='pb-[10px] flex gap-[10px]'>
            <p>{jobDetail?.title}</p>
          </div>

          <p className='font-bold text-2xl'>{jobDetail?.name}</p>

          <p className='text-lg'>{jobDetail?.position}</p>

          <div className='flex py-6 px-[10px] gap-[10px] border border-solid border-[#E1E1E1]'>
            <EventAvailableIcon />
            <p>1月10日(火)</p>
          </div>

          <div className='flex gap-[11px] border-b border-solid border-b-[#E1E1E1]'>
            <div
              onClick={() => handleChangeStatusTab()}
              className={`flex w-1/2 justify-center items-end px-[5px] py-[10px] 
            border-solid  gap-[10px] ${!tab ? 'border-b border-b-mainColor text-mainColor ' : ''}`}>
              <p className='text-base font-bold'>予約</p>
            </div>

            <div
              onClick={() => handleChangeTab()}
              className={`flex w-1/2 justify-center items-end px-[5px] py-[10px] 
            border-solid  gap-[10px] ${tab ? 'border-b border-b-mainColor text-mainColor ' : ''}`}>
              <p className='text-base font-bold '>予約概要</p>
            </div>

          </div>

          <div className='flex flex-col '>
            {
              tab ? <p className='text-sm'>
                スタートアップのプロダクト開発に興味がある方、お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！
              </p> : <>
                {bookingStep === 0 && (
                  <>
                    <div className="mt-[20px] ">
                      <p className="font-bold text-sm">予約したい時間帯をクリックしてください。</p>
                      <div className="flex flex-col gap-[15px] mt-5  items-center">

                        {jobDetail?.time.map((t, index) => (
                          <Button key={index}
                            onClick={() => handleTimeSelection(t.time)}
                            disabled={!t.isFull}
                            className={` w-full rounded-[50px] text-[#fff] font-bold ${t.isFull ? 'bg-[#BA00FF] hover:bg-[#BA00FF]' : 'bg-[#F4D8FF] hover:bg-[#BA00FF]'}`}
                          >
                            <p className="text-lg font-bold">
                              {t.time}
                            </p>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {bookingStep === 1 &&
                  <>
                    <div className='flex flex-col gap-4 p-5'>
                      <div className='flex justify-center'>
                        <div className='flex justify-between items-center gap-4'>
                          <div
                            onClick={() => setBookingStep(0)}
                            className='flex items-center gap-[3px]'>
                            <AvTimerIcon />
                            <p className='text-sm font-bold text-[#ba00ff]'>他の時間を選ぶ</p>
                          </div>
                        </div>
                      </div>

                      <div className='flex py-6 px-[10px] gap-[10px] border-t border-b border-solid border-[#e1e1e1] font-bold text-lg'>
                        <EventAvailableIcon />
                        <p>1月10日(火)</p>
                        <p>{selectedTime}</p>
                      </div>

                      <div className='flex pt-5 pb-[10px] gap-[10px]'>
                        <p className='font-bold text-sm'>全ての項目を記入して予約ボタンを押してください。</p>
                      </div>
                    </div>

                    <div className='flex flex-col items-center gap-8'>
                      <TextField
                        sx={{ fontFamily: 'Noto Sans JP, sans-serif', width: '100%' }}
                        id="outlined-basic"
                        label="お名前"
                        InputLabelProps={{
                          shrink: true,
                          style: { fontWeight: '400', fontSize: '12px', color: '#ba00ff' },

                        }} />
                      <TextField
                        sx={{ fontFamily: 'Noto Sans JP, sans-serif', width: '100%' }}
                        id="outlined-basic"
                        label="メールアドレス"
                        InputLabelProps={{ shrink: true, style: { fontWeight: '400', fontSize: '12px', color: '#ba00ff', borderColor: '#ba00ff' } }} />

                      <Button
                        onClick={() => setBookingStep(2)}
                        sx={{ fontFamily: 'Noto Sans JP, sans-serif', width: '100%' }}
                        className="bg-[#ba00ff] text-[#fff] rounded-[50px] mt-5 py-3">
                        <p className='font-bold text-2xl font-noto-sans-jp'>予約する</p>
                      </Button>
                    </div>
                  </>
                }

                {bookingStep === 2 && (
                  <div className="flex flex-col justify-center items-center h-full">

                    <DoneIcon style={{ height: 86, width: 104, color: '#BA00FF' }} />
                    <div className="mt-[74px]">
                      <p className="text-2xl font-bold">予約が完了しました</p>
                    </div>

                    <div className="cursor-pointer text-[#ba00ff] flex items-center gap-[6px] mt-14 text-sm" onClick={() => setBookingStep(0)}>
                      <AvTimerIcon />
                      <p>他の時間を選ぶ</p>
                    </div>
                  </div>
                )}
              </>
            }
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default ReservationDrawer