
import Image from "next/image";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CloseIcon from '@mui/icons-material/Close';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { TJob } from "components/types/common";
import { Formik } from 'formik';
import { ReservationRegistration } from "components/app/auth/Schema";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export interface IReservationItem {
  jobDetail?: TJob,
  handleClose: () => void
}
const ReservationItem = ({ jobDetail, handleClose }: IReservationItem) => {
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setBookingStep(1);
  };
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingStep, setBookingStep] = useState(0);
  return (
    <Grid container >
      <Grid item xs={12} md={7}
        className="py-[60px] pl-[60px] border-r border-[#808080]" >
        <div className="flex flex-col gap-y-4">
          <Image
            alt="image"
            width={609}
            height={0}
            src='/work.png'
            className="rounded-[20px] h-[312px]"
          />
          <div className="font-bold px-8 pr-16">
            <p className="text-2xl mb-4">{jobDetail?.title}</p>
            <p className="text-2xl">{jobDetail?.name}</p>
            <p className="text-lg py-3 ">{jobDetail?.position}</p>

            <div>
              <p className="text-sm font-normal border-t border-[#D8D8D8] pt-4">
                スタートアップのプロダクト開発に興味がある方、お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                お話ししましょう！
              </p>
            </div>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} md={5}
        className='pl-[66px] pr-[80px] pt-[60px]'>
        {bookingStep === 0 && (
          <>
            <p className="font-bold text-lg my-4">Reverse</p>
            <div className="flex items-center font-bold py-8 border-t border-b border-[#D8D8D8]">
              <EventAvailableIcon />
              <p>{jobDetail?.day}</p>
            </div>

            <div className="mt-[40px] ">
              <p className="font-bold text-sm">予約したい時間帯をクリックしてください。</p>
              <div className="flex flex-col gap-[15px] mt-5  items-center">

                {jobDetail?.time.map((t, index) => (
                  <Button key={index} onClick={() => handleTimeSelection(t.time)}
                    disabled={!t.isFull}
                    className={`h-10 w-96 rounded-[50px] text-[#fff] font-bold ${t.isFull ? 'bg-[#BA00FF] hover:bg-mainColor/[0.6]' : 'bg-[#F4D8FF]'}`}
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
        {bookingStep === 1 && (<>
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg my-4">Reverse</p>
            <div className="cursor-pointer text-[#ba00ff] flex 
            items-center gap-[6px] hover:text-mainColor/[0.6]" onClick={() => setBookingStep(0)}>
              <AvTimerIcon />
              <p>他の時間を選ぶ</p>
            </div>
          </div>
          <div className="flex items-center font-bold py-8 border-t border-b border-[#D8D8D8]">
            <EventAvailableIcon />
            <p>{jobDetail?.day}</p>
          </div>

          <div className="mt-9">
            <p className="font-bold text-sm">予約したい時間帯をクリックしてください。</p>
            <div className="flex flex-col gap-[15px] mt-11">
              <Formik
                initialValues={{
                  email: '',
                  name: '',
                }}

                validationSchema={ReservationRegistration}
                onSubmit={(data) => {
                  alert('login success')
                }}
              >
                {
                  ({ values,
                    errors,
                    touched,
                    isValid,
                    handleBlur,
                    handleChange,
                    handleSubmit, }) => (
                    <>
                      <div className="relative">

                        <TextField
                          sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                          id="name"
                          label="お名前"
                          value={values.name}
                          style={{ width: '100%' }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }} />
                        {touched.name && errors.name && (
                          <>
                            <ReportProblemIcon className="absolute right-3 h-6 w-6 translate-y-1/2 text-[#E5242A]" />
                            <p className="text-[#E5242A] text-xs mt-2">役職は必須です</p>
                          </>
                        )}
                      </div>

                      <div className="relative">

                        <TextField
                          sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                          id="email"
                          style={{ width: '100%' }}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="メールアドレス"
                          InputLabelProps={{ shrink: true, }} />
                        {touched.email && errors.email && (
                          <>
                            <ReportProblemIcon className="absolute right-3 h-6 w-6 translate-y-1/2 text-[#E5242A]" />
                            <p className="text-[#E5242A] text-xs mt-2">メールアドレスを入力してください</p>
                          </>
                        )}
                      </div>

                      <Button
                        sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                        className={` text-[#fff] rounded-[50px] 
                        mt-5 py-3 ${!isValid ? 'bg-[#E1E1E1]' : 'bg-[#BA00ff] hover:bg-[#BA00ff]/[0.6]'}`}
                        onClick={() => setBookingStep(2)}>
                        <p className='font-bold text-2xl font-noto-sans-jp'>予約する</p>
                      </Button>
                    </>
                  )
                }
              </Formik>

            </div>
          </div>
        </>)}

        {bookingStep === 2 && (
          <div className="flex flex-col justify-center items-center h-full">

            <DoneIcon style={{ height: 86, width: 104, color: '#BA00FF' }} />
            <div className="mt-[74px]">
              <p className="text-2xl font-bold">予約が完了しました</p>
            </div>

            <div className="cursor-pointer text-[#ba00ff] hover:text-mainColor/[0.6] flex items-center gap-[6px] mt-14 text-sm" onClick={() => setBookingStep(0)}>
              <AvTimerIcon />
              <p>他の時間を選ぶ</p>
            </div>
          </div>
        )}

      </Grid>

      <Button onClick={handleClose} className="absolute top-0 right-0">
        <CloseIcon className="text-[#000000]" />
      </Button>
    </Grid>
  )
}
export default ReservationItem