'use client'

import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Button, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import MediaCard from 'components/components/card'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  return (
    <div className='container-responsive'>
      <div className='mt-8 relative'>

        <Image alt='lunchpal' src='/lunchpalmain.png' width={1248} height={200} className='rounded-[20px] opacity-70' />
        <div className='border border-[#BA00FF] absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-1/2 bg-white flex h-[60px] pl-[18px] items-center rounded bg-[#fff]'>
          <div >
            <TextField id="outlined-basic" label="キーワードで探す" variant="standard" margin="normal" placeholder='人物・キーワード' InputProps={{ disableUnderline: true }} InputLabelProps={{ shrink: true, style: { fontWeight: 'bold', fontSize: '12px', color: '#000000' } }} />
            <TextField id="outlined-basic" label="日付を選択" variant="standard" margin='normal' placeholder='カレンダーから選ぶ' InputProps={{ disableUnderline: true }} InputLabelProps={{ shrink: true, style: { fontWeight: 'bold', fontSize: '12px', color: '#000000' } }} />
          </div>

          <Button className='bg-[#ba00ff] h-[60px]'>
            <SearchOutlined className='text-[#fff]' />
          </Button>
        </div>
      </div>


      <div className='mt-[50px] flex gap-x-4'>
        <p className='font-bold text-sm'>検索結果</p>
        <p className='font-bold text-sm'>9件</p>
      </div>

      <div>
        <MediaCard />
      </div>

    </div>
  )
}
