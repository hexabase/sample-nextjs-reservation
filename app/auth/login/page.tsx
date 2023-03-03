'use client'
import { TextField } from '@mui/material';
import { FooterMobile } from 'components/components/footerMobile';
import { Formik } from 'formik';
import Image from 'next/image';
import { SchemaLogin } from '../Schema';

const LoginPage = () => {
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
                handleSubmit, }) =>
              (<form className='w-full md:w-96 flex flex-col gap-8 md:gap-10 justify-center'>
                <TextField
                  id="email"
                  placeholder='sample@hexabase.com'
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
                  value={values.password}
                  InputLabelProps={{ shrink: true }}
                  style={{ width: '100%' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${touched.password && errors.password
                    ? 'border-[#ba00ff]'
                    : 'border-[#fff]'
                    } input-field solid`}
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                />

                <button
                  type='submit'
                  className='bg-[#BA00ff] rounded-[4px] py-2 px-8 text-[#fff]
                      hover:bg-[#BA00ff]/[0.6]'>
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