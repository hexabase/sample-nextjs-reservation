'use client'
import { TextField } from '@mui/material';
import { FooterMobile } from 'components/components/footerMobile';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className='container-responsive'>
      <div className='flex flex-col justify-center px-5 md:px-0 md:py-[100px] text-center gap-4 md:gap-10'>
        <div className='p-10'>
          <Image alt='logo' src='/logoAdministrator.png' width={233} height={78} className='inline-block' />
        </div>

        <p className='mb-5 md:mb-10'>ログイン</p>
        <div className='flex justify-center'>
          <form className='w-full md:w-96 flex flex-col gap-8 md:gap-10 justify-center'>
            <TextField
              id="outlined-controlled"
              placeholder='sample@hexabase.com'
              label="メールアドレス*"
              InputLabelProps={{ shrink: true }}
              style={{ width: '100%' }}
            />

            <TextField
              id="outlined-controlled"
              placeholder='••••••••'
              label="パスワード*"
              InputLabelProps={{ shrink: true }}
              style={{ width: '100%' }}
            />


            <button
              type='submit'
              className='bg-[#BA00ff] rounded-[4px] py-2 px-8 text-[#fff]
                      hover:bg-[#BA00ff]/[0.6]'>
              ログイン
            </button>
          </form>
        </div>
        <FooterMobile />
      </div>
    </div>
  )
}

export default LoginPage