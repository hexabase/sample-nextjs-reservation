'use client'
import { makeStyles } from '@material-ui/core';
import { Box, Button, Divider, FormControl, Grid, InputLabel, Modal, OutlinedInput, TextField } from "@mui/material";
import { TJob } from "components/types/common";
import Image from "next/image";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CloseIcon from '@mui/icons-material/Close';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from "react";
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

  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingStep, setBookingStep] = useState(0);
  const classes = useStyles();

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setBookingStep(1);
  };

  return (
    <Modal open={open} onClose={() => {
      handleClose();
      setBookingStep(0)
    }}>
      <>
        <div className="modal-body">
          <Box sx={{ ...style, width: 1248, borderRadius: '20px', }}>
            <Grid container >

              <Grid item xs={7} className="py-[60px] pl-[60px] border-r border-[#808080]" >
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
              {/* <Divider orientation="vertical" flexItem /> */}
              <Grid item xs={5} className='pl-[66px] pr-[80px] pt-[60px]'>
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
                            className={`h-10 w-96 rounded-[50px] text-[#fff] font-bold ${t.isFull ? 'bg-[#BA00FF] hover:bg-[#BA00FF]' : 'bg-[#F4D8FF] hover:bg-[#BA00FF]'}`}
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
                    <div className="cursor-pointer text-[#ba00ff] flex items-center gap-[6px]" onClick={() => setBookingStep(0)}>
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

                      <TextField
                        sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                        id="outlined-basic"
                        label="お名前"

                        InputProps={{
                          style: style.notchedOutline,
                        }}
                        InputLabelProps={{
                          shrink: true,
                          style: { fontWeight: '400', fontSize: '12px', color: '#ba00ff' },

                        }} />
                      <TextField
                        sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                        id="outlined-basic"
                        label="メールアドレス"

                        InputLabelProps={{ shrink: true, style: { fontWeight: '400', fontSize: '12px', color: '#ba00ff', borderColor: '#ba00ff' } }} />

                      <Button
                        sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                        className="bg-[#ba00ff] text-[#fff] rounded-[50px] mt-5 py-3" onClick={() => setBookingStep(2)}>
                        <p className='font-bold text-2xl font-noto-sans-jp'>予約する</p>
                      </Button>
                    </div>
                  </div>
                </>)}

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

              </Grid>

              <Button onClick={handleClose} className="absolute top-0 right-0">
                <CloseIcon className="text-[#000000]" />
              </Button>
            </Grid>

          </Box>

        </div></>
    </Modal>
  )
}

export default ChildModel