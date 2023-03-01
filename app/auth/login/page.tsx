'use client'
import { TextField } from '@mui/material';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className='container-responsive'>

      <div className="text-center py-[100px] px-[432px]">
        <div className='p-10 mb-10'>

          <Image alt='logo' src='/logoAdministrator.png' width={233} height={78} className='inline-block' />
        </div>

        <p className='mb-10'>ログイン</p>

        <form className='w-full flex flex-col gap-10'>
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
            送信する
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage