'use client'

import { Grid, TextField } from "@mui/material"
import { FooterMobile } from "components/components/footerMobile";
import Image from 'next/image';

const RegisterPage = () => {
  return (
    <div className="container-responsive">

      <div className="py-[30px] md:py-[150px]">
        <Grid container >
          <Grid item xs={12} md={6} className='flex flex-col justify-center items-center pt-[30px]'>
            <div>
              <div className='text-center'>

                <Image alt='logo' src='/logoAdministrator.png' width={233} height={76} className='inline-block' />
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
                <form className='w-full flex flex-col gap-10'>
                  <TextField
                    id="outlined-controlled"
                    placeholder='山田　太郎'
                    label="お名前*"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: '100%' }}
                  />

                  <TextField
                    id="outlined-controlled"
                    placeholder='代表取締役社長'
                    label="役職*"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: '100%' }}
                  />
                  <TextField
                    id="outlined-controlled"
                    placeholder='代表取締役社長'
                    label="パスワード*"
                    InputLabelProps={{ shrink: true }}
                    style={{ width: '100%' }}
                  />

                  <button
                    type='submit'
                    className='bg-[#BA00ff] rounded-[4px] py-2 px-8 text-[#fff] hover:bg-[#BA00ff]/[0.6]'>
                    送信する
                  </button>
                </form>
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