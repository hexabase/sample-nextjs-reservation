'use client'
import { makeStyles } from '@material-ui/core';
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
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

export interface IRegistrationModal {
  handleClose: () => void,
  handleOpen: () => void,
  open: boolean
}
const RegistrationModal = ({ handleClose, handleOpen, open }: IRegistrationModal) => {
  const [inputValue, setInputValue] = useState('');
  const [bookingStep, setBookingStep] = useState(0);
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setBookingStep(1)
    console.log('Input value:', inputValue);

  };
  return (
    <Modal open={open} onClose={() => handleClose()}>
      <div className='modal-body'>

        {bookingStep === 0 &&
          <>
            <Box sx={{ ...style, width: 1248, borderRadius: '20px', padding: '160px 60px' }}>
              <Grid container >
                <Grid item xs={4} className='mr-[80px]'>
                  <div className='flex flex-col justify-center pt-[30px]'>
                    <div className='text-center'>

                      <Image alt='logo' src='/logoAdministrator.png' width={233} height={76} className='inline-block' />
                    </div>
                    <div className='mt-[50px]'>
                      <p className='text-[#BA00FF] text-2xl'>社内コミュニケーションを円滑に!</p>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={7}>
                  <div className='flex flex-col gap-[26px]'>
                    <p className='text-lg'>管理者登録</p>
                    <p className='font-bold text-2xl'>メールアドレスを入力して送信してください</p>
                    <p className='text-sm'>ご登録するメールアドレスをご入力後、送信ボタンをクリックしてください。
                      ご入力いただいたメールアドレス宛に届く会員登録フォームよりご登録をお願いいたします。</p>
                    <div className='flex'>
                      <form onSubmit={() => handleSubmit(event)} className='flex w-full'>
                        <TextField
                          label="メールアドレス"
                          variant="outlined"
                          style={{ width: '80%', marginRight: '8px' }}
                          value={inputValue}
                          onChange={handleChange}
                        />

                        <Button
                          type='submit'
                          className='bg-[#BA00ff] rounded-[4px] py-2 px-8 text-[#fff]'>
                          送信する
                        </Button>
                      </form>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </>
        }

        {bookingStep === 1 &&
          <>
            <Box sx={{ ...style, width: 1248, borderRadius: '20px', padding: '120px', textAlign: 'center' }}>

              <Image alt='administration' src='/imageRegis.png' width={208} height={167} className='inline-block mb-[40px]' />

              <p className='font-bold text-2xl'>メールを送信しました</p>
              <p className='text-sm'>お届けしたメールに記載されている会員登録URLより会員登録フォームにおすすみください。</p>

              <div className='flex text-[#BA00FF] text-lg font-bold cursor-pointer justify-center mt-[26px]'>
                <HomeIcon />
                <p>ホーム</p>
              </div>
            </Box>
          </>
        }

      </div>
    </Modal>
  )
}

export default RegistrationModal