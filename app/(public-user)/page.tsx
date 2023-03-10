'use client'

import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Button, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import MediaCard from 'components/components/card'
import { FooterMobile } from 'components/components/footerMobile'
import CloseIcon from '@mui/icons-material/Close';
import { jobs } from '../../utils/db'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <div className='container-responsive'>
      <div className='flex flex-col gap-y-2 sm:gap-y-8'>
        <div className='sm:hidden'>
          <Button className='bg-[#f2f2f2] text-[#808080] rounded-[50px]  mb-2 mt-2'>
            <div className='flex items-center justify-between gap-x-4'>
              <p className='text-xs'>1月10日(火)</p>
              <CloseIcon className='h-4 w-4' />
            </div>
          </Button>
        </div>

        <div className='hidden sm:block sm:mt-8 sm:relative'>
          <Image alt='lunchpal' src='/lunchpalmain.png' width={1248} height={200} className='rounded-[20px] opacity-70' />
          <div className='border border-[#BA00FF] absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-1/2 bg-white flex h-[60px] pl-[18px] items-center rounded bg-[#fff]'>
            <div >
              <TextField id="outlined-basic" label="キーワードで探す" variant="standard" margin="normal" placeholder='人物・キーワード' InputProps={{
                disableUnderline: true, style: {
                  fontFamily: 'Noto Sans JP, sans-serif',
                },
              }} InputLabelProps={{ shrink: true, style: { fontWeight: 'bold', fontSize: '12px', color: '#000000', fontFamily: 'Noto Sans JP, sans-serif', } }} />
              <TextField id="outlined-basic" label="日付を選択" variant="standard" margin='normal' placeholder='カレンダーから選ぶ' InputProps={{
                disableUnderline: true, style: {
                  fontFamily: 'Noto Sans JP, sans-serif',
                },
              }} InputLabelProps={{ shrink: true, style: { fontWeight: 'bold', fontSize: '12px', color: '#000000', fontFamily: 'Noto Sans JP, sans-serif', } }} />
            </div>

            <Button className='bg-[#ba00ff] h-[60px] '>
              <SearchOutlined className='text-[#fff]' />
            </Button>
          </div>
        </div>

        <div className='sm:mt-[18px] flex gap-x-4'>
          <p className='font-bold text-sm'>検索結果</p>
          <p className='font-bold text-sm'>9件</p>
        </div>

        <div className='mb-[52px]'>
          <MediaCard jobs={jobs} />
        </div>
      </div>
      <div className='sm:hidden'>
        <FooterMobile />
      </div>
    </div>
  )
}
