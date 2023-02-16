'use client'

import { Button, Grid, Pagination } from "@mui/material"
import TableData from "components/components/table"
import { TJob } from "components/types/common"

const Administrator = () => {
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
    <>
      <div className="pl-[327px]">
        <p className="font-bold text-lg">ホスト一覧</p>
      </div>
      <Grid container spacing={0}>
        <Grid item xs={4} style={{ maxWidth: '280px', background: '#F8F9FA', border: '1px solid #E1E1E1' }}>
          <div className="px-4 w-full pt-20">

            <Button className="w-full bg-[#ba00ff] text-[#fff] rounded-[50px]">
              <p className="font-sans">

                新規登録
              </p>
            </Button>
          </div>

        </Grid>
        <Grid item xs={8} style={{ maxWidth: '1448px', paddingTop: '35px', paddingLeft: '48px', borderTop: '1px solid #E1E1E1', borderBottom: '1px solid #E1E1E1' }}>
          <div className="flex items-center justify-between mb-5">
            <p>
              1件〜10件 / 全120件
            </p>
            <div>
              <Pagination count={10} />
            </div>
          </div>
          <TableData jobs={jobs} />
        </Grid>
      </Grid>
    </>
  )
}

export default Administrator