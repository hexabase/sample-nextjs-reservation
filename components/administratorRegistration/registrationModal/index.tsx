'use client'
import { makeStyles } from '@material-ui/core';
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Formik } from 'formik';
import { EmailRegistration } from 'components/app/(public-user)/auth/Schema';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { addUser, userInvite } from "components/utils/api";
import { EMessageError, ETypeStatus, TJob, TNotification } from "components/types/common";
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '49.5%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 1248,
  bgcolor: '#FFFFFF',
  boxShadow: 24,
  notchedOutline: {
    borderColor: 'red',
  },
  '@media (max-width: 600px)': {
    height: '100%',
    maxWidth: '100%',
    padding: '0px 20px',
    top: '60%',
    boxShadow: 0,
  },
};

export interface IRegistrationModal {
  handleClose: () => void,
  handleOpen?: () => void,
  open: boolean
}

interface FormValues {
  email: string,
}
const RegistrationModal = ({ handleClose, handleOpen, open }: IRegistrationModal) => {
  const [bookingStep, setBookingStep] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [notification, setNotification] = useState<TNotification>({
    open: false,
  });
  const router = useRouter()
  const addUserHandler = async (data: FormValues) => {
    try {
      const res = await addUser(data.email)
      if (res.status === 200 && !res.data.added) {
        userInviteHandler(data)
        setBookingStep(1)
      } else {
        setNotification({
          open: true,
          type: ETypeStatus.ERROR,
          message: EMessageError.ERR_01,
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        type: ETypeStatus.ERROR,
        message: EMessageError.ERR_01,
      });
    }
  }

  const userInviteHandler = async (data: FormValues) => {
    try {
      const res = await userInvite(data.email);

      if (res.status === 200) {
        router.push('/auth/register-completed');
      } else {
        setNotification({
          open: true,
          type: ETypeStatus.ERROR,
          message: EMessageError.ERR_01,
        });
      }
    } catch (error) {
    }
  };
  return (
    <Modal open={open}
      hideBackdrop={isMobile ? true : false}
      onClose={() => handleClose()}
    >
      <div className='modal-body '>
        {bookingStep === 0 &&
          <>
            <Box sx={{ ...style, padding: '160px 60px' }}
              className='md:rounded-[20px]'
            >
              <div
                onClick={() => handleClose()}
                className='w-full text-right py-[10px]'>
                <CloseIcon className='md:hidden ' />
              </div>
              <Grid container >
                <Grid item xs={12} md={4} className='md:mr-[80px] mb-[72px] md:mb-0 '>
                  <div className='flex flex-col-reverse items-center md:flex-col justify-center pt-[30px]'>
                    <div className='text-center'>
                      <Image alt='logo' src='/logoAdministrator.svg' width={233} height={76}
                        className='inline-block' />
                    </div>
                    <div className='md:mt-[50px]'>
                      <p className='text-[#BA00FF] text-base md:text-2xl mb-10 md:mb-0'>
                        社内コミュニケーションを円滑に!
                      </p>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={7}>
                  <div className='flex flex-col gap-[26px] text-center md:text-left'>
                    <p className='text-lg'>管理者登録</p>
                    <p className='font-bold text-base md:text-2xl'>メールアドレスを入力して送信してください</p>
                    <p className='text-xs md:text-sm'>ご登録するメールアドレスをご入力後、送信ボタンをクリックしてください。
                      ご入力いただいたメールアドレス宛に届く会員登録フォームよりご登録をお願いいたします。</p>
                    <div className='flex'>
                      <Formik
                        initialValues={{
                          email: '',
                        }}
                        validationSchema={EmailRegistration}
                        onSubmit={(data: FormValues) => addUserHandler(data)
                        }
                      >
                        {({ values,
                          errors,
                          touched,
                          isValid,
                          handleBlur,
                          handleChange,
                          handleSubmit, }) =>
                        (<form
                          onSubmit={handleSubmit}
                          className='relative md:flex w-full'>
                          <TextField
                            id="email"
                            placeholder='sample@hexabase.com'
                            label="メールアドレス*"
                            value={values.email}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            className='w-full md:w-[80%] md:mr-2 mb-6 md:mb-0'
                          />
                          {touched.email && errors.email && <p className='absolute text-[#FF0000] !top-full text-xs'>メールアドレスの形式が正しくありません</p>}
                          <Button
                            disabled={!isValid}
                            type='submit'
                            className={`w-full md:w-auto rounded-[4px] py-2 px-8  ${isValid ? 'bg-[#BA00ff] hover:bg-[#ba00ff]/[0.6]' : 'bg-[#E1E1E1]'}`}>
                            <p className='text-[#fff]'>
                              送信する
                            </p>
                          </Button>
                        </form>)
                        }
                      </Formik>
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
              <Image alt='administration' src='/imageRegis.svg' width={208} height={167} className='inline-block mb-[40px]' />
              <p className='font-bold text-2xl'>メールを送信しました</p>
              <p className='text-sm'>お届けしたメールに記載されている会員登録URLより会員登録フォームにおすすみください。</p>
              <div
                onClick={() => {
                  setBookingStep(0)
                  handleClose();
                }}
                className='flex text-[#BA00FF] text-lg font-bold cursor-pointer justify-center mt-[26px]'>
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