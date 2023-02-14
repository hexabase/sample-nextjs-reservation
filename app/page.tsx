'use client'

import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Button, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import MediaCard from 'components/components/card'
import { TJob } from 'components/types/common'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const jobs: TJob[] = [
    {
      id: '1',
      title: 'スタートアップのプロダクト開発に興味がある方、お話ししましょう！',
      name: '山田 太郎',
      position: 'CEO',
      day: '1月10日(火)',
      isAvailable: true,
      time: [{
        time: '9:00',
        isFull: true
      },

      {
        time: '10:00',
        isFull: false
      },
      {
        time: '11:00',
        isFull: true
      },
      {
        time: '12:00',
        isFull: false
      },
      {
        time: '13:00',
        isFull: true
      },
      {
        time: '14:00',
        isFull: true
      },
      {
        time: '15:00',
        isFull: false
      },
      {
        time: '16:00',
        isFull: true
      },

      ]
    },

    {
      id: '2',
      title: 'プログラミングの楽しさについて一緒に盛りあがりましょう！',
      name: 'ジョン・C・グレイ',
      position: 'CTO',
      day: '1月10日(火)',
      isAvailable: false,
      time: [

        {
          time: '10:00',
          isFull: false
        },
        {
          time: '11:00',
          isFull: false
        },
        {
          time: '12:00',
          isFull: false
        }
      ]
    },

    {
      id: '3',
      title: 'これからのCROに必要なスキルと役割をざっくばらんにお話ししましょう！',
      name: '吉田 恵子',
      position: 'CRO',
      day: '1月10日(火)',
      isAvailable: true,
      time: [{
        time: '9:00',
        isFull: true
      },

      {
        time: '10:00',
        isFull: false
      },
      {
        time: '11:00',
        isFull: true
      },
      {
        time: '12:00',
        isFull: false
      },
      {
        time: '13:00',
        isFull: true
      },
      {
        time: '14:00',
        isFull: true
      },
      {
        time: '15:00',
        isFull: false
      },
      {
        time: '16:00',
        isFull: true
      },

      ]
    },

    {
      id: '4',
      title: '領収書の電子化について詳しくお話します。',
      name: '佐藤 智恵',
      position: '経理部　課長',
      day: '1月10日(火)',
      isAvailable: true,
      time: [
        {
          time: '11:00',
          isFull: true
        },
        {
          time: '12:00',
          isFull: true
        },
        {
          time: '13:00',
          isFull: false
        },

      ]
    },

    {
      id: '5',
      title: 'プロジェクトを成功させる為に必要な部署や人材を巻き込む力を大切にしています。',
      name: '神谷 武俊',
      position: 'システム開発部　部長',
      day: '1月10日(火)',
      isAvailable: true,
      time: [

        {
          time: '10:00',
          isFull: false
        },
        {
          time: '11:00',
          isFull: true
        },
        {
          time: '12:00',
          isFull: true
        },

      ]
    },

    {
      id: '6',
      title: 'BaaSの基本を整理整頓してメリット・デメリットを網羅的に理解することが、セールスにおいての一番大切なことです。',
      name: '前川 将輝',
      position: 'テクニカルセールス部　部長',
      day: '1月10日(火)',
      isAvailable: true,
      time: [{
        time: '9:00',
        isFull: true
      },

      {
        time: '10:00',
        isFull: false
      },
      {
        time: '11:00',
        isFull: true
      },
      {
        time: '12:00',
        isFull: false
      },
      {
        time: '13:00',
        isFull: true
      }

      ]
    },

    {
      id: '7',
      title: 'マーケティングで市場を読み解くコツやポイントを教えちゃいます！英語の勉強にもなりますよ！',
      name: 'ジェシカ・スコット',
      position: 'マーケティング部　部長',
      day: '1月10日(火)',
      isAvailable: true,
      time: [{
        time: '9:00',
        isFull: true
      },

      {
        time: '10:00',
        isFull: false
      },
      {
        time: '11:00',
        isFull: true
      },
      {
        time: '12:00',
        isFull: false
      },
      {
        time: '13:00',
        isFull: true
      },
      {
        time: '14:00',
        isFull: true
      },
      {
        time: '15:00',
        isFull: false
      },
      {
        time: '16:00',
        isFull: true
      },

      ]
    },

    {
      id: '8',
      title: 'スタートアップのプロダクト開発に興味がある方、お話ししましょう！',
      name: '大西 里織',
      position: '人事部　部長',
      day: '1月10日(火)',
      isAvailable: false,
      time: [{
        time: '9:00',
        isFull: true
      },

      {
        time: '10:00',
        isFull: false
      },

      {
        time: '12:00',
        isFull: false
      },


      ]
    },

    {
      id: '9',
      title: '顧客満足度を向上させる営業スキル10選 ITを駆使してCRMを向上させよう',
      name: '本岡 尚人',
      position: 'CEO',
      day: '1月10日(火)',
      isAvailable: true,
      time: [{
        time: '9:00',
        isFull: true
      },

      {
        time: '10:00',
        isFull: false
      },
      {
        time: '11:00',
        isFull: true
      },
      {
        time: '12:00',
        isFull: false
      },
      {
        time: '13:00',
        isFull: true
      },
      {
        time: '14:00',
        isFull: true
      },
      {
        time: '15:00',
        isFull: false
      },
      {
        time: '16:00',
        isFull: true
      },

      ]
    },
  ]
  return (
    <div className='container-responsive'>
      <div className='flex flex-col gap-y-8'>

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


        <div className='mt-[18px] flex gap-x-4'>
          <p className='font-bold text-sm'>検索結果</p>
          <p className='font-bold text-sm'>9件</p>
        </div>

        <div className='mb-[52px]'>
          <MediaCard jobs={jobs} />
        </div>
      </div>

    </div>
  )
}
