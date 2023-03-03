'use client'

import { Grid, TextField } from "@mui/material"
import { FooterMobile } from "components/components/footerMobile";
import { Formik } from 'formik';
import Image from 'next/image';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { SchemaRegisterAdmin } from "../Schema";
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const handleRouter = () => {
    router.push('/auth/register-completed');
  };
  const handleFormSubmit = () => {

  }
  return (
    <div className="container-responsive">
      <div className="py-[30px] md:py-[150px]">
        <Grid container >
          <Grid item xs={12} md={6} className='flex flex-col justify-center items-center pt-[30px]'>
            <div>
              <div className='text-center'>
                <Image alt='logo' src='/logoAdministrator.svg' width={233} height={76} className='inline-block' />
              </div>
              <div className='mt-[50px]'>
                <p className='text-[#BA00FF] text-xl mb-[40px]'>社内コミュニケーションを円滑に!</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className='w-4/6 flex flex-col gap-[26px] mx-auto my-0 md:m-0'>
              <p className='text-lg font-bold text-center md:text-start md:font-normal'>管理者登録</p>
              <p className='font-bold text-sm'>必要事項を入力して「登録」ボタンをクリックしてください</p>

              <div>
                <Formik
                  initialValues={{
                    name: '',
                    position: '',
                    password: '',
                  }}
                  onSubmit={(data) => {
                    handleRouter()
                    alert(data)
                  }}
                  validationSchema={SchemaRegisterAdmin}
                  validateOnBlur={true}
                  validateOnChange={true}
                >
                  {
                    ({ values,
                      errors,
                      touched,
                      isValid,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      validateForm,
                      dirty }) => (
                      <form
                        onSubmit={handleSubmit}
                        className='w-full flex flex-col gap-8 h-[478px]'>
                        <div className="relative h-[86px]">
                          <TextField
                            id="name"
                            value={values.name}
                            placeholder='山田　太郎'
                            label="お名前*"
                            InputLabelProps={{ shrink: true }}
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                          />
                          {touched.name && errors.name && (
                            <>
                              <ReportProblemIcon className="absolute right-3 h-6 w-6 translate-y-1/2 text-[#E5242A]" />
                              <p className="text-[#E5242A] text-xs mt-2">役職は必須です</p>
                            </>
                          )}
                        </div>
                        <div className="relative h-[86px]">
                          <TextField
                            id="position"
                            value={values.position}
                            placeholder='代表取締役社長'
                            label="役職*"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                            style={{ width: '100%' }}
                            error={touched.position && Boolean(errors.position)}
                          />
                          {touched.position && errors.position && (
                            <>
                              <ReportProblemIcon className="absolute right-3 h-6 w-6 translate-y-1/2 text-[#E5242A]" />
                              <p className="text-[#E5242A] text-xs mt-2">役職は必須です</p>
                            </>
                          )}
                        </div>
                        <div className="relative h-[86px]">
                          <TextField
                            id="password"
                            placeholder='••••••••'
                            label="パスワード*"
                            value={values.password}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ width: '100%' }}
                            error={touched.password && Boolean(errors.password)}
                          />
                          {touched.password && errors.password && (
                            <>
                              <ReportProblemIcon className="absolute right-3 h-6 w-6 translate-y-1/2 text-[#E5242A]" />
                              <p className="text-[#E5242A] text-xs mt-2">パスワードは必須です</p>
                            </>
                          )}
                        </div>
                        <button
                          disabled={!isValid}
                          onClick={() => validateForm()}
                          type='submit'
                          className={` rounded-[4px] py-2 px-8 
                          text-[#fff] 
                          ${!isValid ? 'bg-[#E1E1E1]' : 'bg-[#BA00ff] hover:bg-[#BA00ff]/[0.6]'}`} >
                          送信する
                        </button>
                      </form>
                    )
                  }
                </Formik>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <FooterMobile />
    </div>
  )
}

export default RegisterPage