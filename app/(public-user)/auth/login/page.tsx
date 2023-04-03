'use client'
import { TextField } from '@mui/material';
import { FooterMobile } from 'components/components/footerMobile';
import { setCookie } from 'cookies-next';
import { Formik } from 'formik';
import Image from 'next/image';
import { SchemaLogin } from '../Schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EMessageError, ETypeStatus, TNotification } from 'components/types/common';
import { login } from 'components/utils/api';

interface FormValuesProps {
  email: string,
  password: string,
}
const LoginPage = () => {
  const router = useRouter()
  const [notification, setNotification] = useState<TNotification>({
    open: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const loginHandler = async (formValues: FormValuesProps) => {
    try {
      const { email, password } = formValues;
      const loginRes = await login({
        email,
        password,
      });

      if (loginRes.data.token) {
        setCookie('token', loginRes.data.token);
        router.push('/administrator');
      }
    } catch (error) {
      setErrorMessage("パスワードが不正です")
      setNotification({
        open: true,
        type: ETypeStatus.ERROR,
        message: EMessageError.ERR_01,
      });
    }
  };
  return (
    <div className='container-responsive'>
      <div className='flex flex-col justify-center px-5 md:px-0 md:py-[100px] text-center gap-4 md:gap-10'>
        <div className='p-10'>
          <Image alt='logo' src='/logoAdministrator.svg' width={233} height={78} className='inline-block' />
        </div>

        <p className='mb-5 md:mb-10'>ログイン</p>
        <div className='flex justify-center'>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SchemaLogin}
            onSubmit={(data: FormValuesProps) => {
              loginHandler(data)
            }}
          >
            {
              ({ values,
                errors,
                touched,
                isValid,
                handleBlur,
                handleChange,
                handleSubmit,
                dirty, }) =>
              (<form
                onSubmit={handleSubmit}
                className='w-full md:w-96 flex flex-col gap-8 md:gap-10 justify-center'>
                <TextField
                  id="email"
                  placeholder='yourhost@hexabase.com'
                  value={values.email}
                  label="メールアドレス*"
                  InputLabelProps={{ shrink: true }}
                  style={{ width: '100%' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  id="password"
                  placeholder='••••••••'
                  label="パスワード*"
                  type='password'
                  value={values.password}
                  InputLabelProps={{ shrink: true }}
                  style={{ width: '100%' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${touched.password && errors.password
                    ? 'border-[#ba00ff]'
                    : 'border-[#fff]'
                    } input-field solid`}
                  helperText={touched.password && errors.password ? errors.password : errorMessage}
                  error={Boolean(touched.password && (errors.password || errorMessage))}
                />

                <button
                  type='submit'
                  className={`rounded-[4px] py-2 px-8 text-[#fff]
                  ${!(isValid && dirty) ? 'bg-[#E1E1E1]' : 'bg-[#BA00ff] hover:bg-[#BA00ff]/[0.6]'}`}>
                  ログイン
                </button>
              </form>)
            }
          </Formik>
        </div>
        <FooterMobile />
      </div>
    </div>
  )
}

export default LoginPage