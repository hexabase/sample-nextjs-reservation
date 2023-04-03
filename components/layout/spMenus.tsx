import { Drawer } from '@material-ui/core';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface ISPMenus {
  showMenu?: boolean,
  handleClose: () => void,
  setShowRegister: Dispatch<SetStateAction<boolean>>,
}
export const SPMenus = ({ showMenu, handleClose, setShowRegister }: ISPMenus) => {
  const menuList = [
    {
      title: '予約者',
      item: [
        {
          itemTitle: 'アジェンダ一覧ページ'
        },
      ]
    },
    {
      title: '管理者',
      item: [
        {
          itemTitle: 'ログイン'
        },
        {
          itemTitle: '管理者登録'
        }
      ],
    },
  ]

  return (
    <>
      <Drawer
        open={showMenu}
        anchor='right'
        PaperProps={{
          className: 'w-full h-screen'
        }}
        onClose={() => handleClose()}
      >

        <div className=' bg-[#F5F5F5] sm:hidden'>
          <div className='flex justify-between items-center p-5 '>
            <Link href="/"><img alt='logo' src='/logo.svg' width={120} height={24} /></Link>
            <CloseIcon
              onClick={() => handleClose()}
              className='w-6 h-5' />
          </div>
          <div className='pt-10'>
            <div className="grid grid-cols-1 ">
              <div className="pb-10">
                {menuList.map((menu, index) => (
                  <div key={index}>
                    <div className="p-[10px] border-b border-b-[#E1E1E1]">
                      <p className="text-[#808080] text-base font-medium">{menu.title}</p>
                    </div>

                    {menu.item.map((item, index) => (
                      <div key={index} className='p-[10px] flex justify-between items-center text-[#BA00FF]'>
                        <p className="font-medium text-base">{item.itemTitle}</p>
                        <KeyboardArrowRightIcon
                          onClick={() => {
                            handleClose()
                            setShowRegister(true)
                          }}
                          className='w-5 h-5' />
                      </div>
                    ))}
                  </div>

                ))}
              </div>
              <div className="p-[10px] text-sm font-medium border-t border-t-[#E1E1E1] flex flex-col gap-4">
                <a href="https://www.hexabase.com/" target="_blank" rel="noreferrer"><p>運営会社</p></a>
                <a href="https://www.hexabase.com/privacy-policy/" target="_blank" rel="noreferrer"><p>プライバシーポリシー</p></a>
                <a href="https://www.hexabase.com/contact-us/" target="_blank" rel="noreferrer"><p>お問い合わせ</p></a>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

