'use client'

import Image from 'next/image'
import '../../globals.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logout } from 'components/utils/api';
import { EMessageError, ETypeStatus, TNotification } from 'components/types/common';
import { deleteCookie } from 'cookies-next';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [notification, setNotification] = useState<TNotification>({
    open: false,
  });

  const router = useRouter()
  const handleLogout = () => {
    deleteCookie('token');
    router.push('/auth/login');
  };
  const logoutHandler = async () => {
    try {
      const res = await logout()
      res.data && handleLogout()
    } catch (error) {
      setNotification({
        open: true,
        type: ETypeStatus.ERROR,
        message: EMessageError.ERR_01,
      });
    }
  }
  return (
    <html lang="en">
      <head />
      <body id='__next'>
        <div>
          <div className='px-4 border-b border-solid border-[#E1E1E1]'>
            <div className='flex items-center justify-between py-5'>
              <Image src='/logoForAdministrator.svg'
                width={297} height={43.06}
                alt='logo'
                className='w-[197px] h-[28px] md:w-[297px] h-[43px]'
              />
              <div className='flex gap-[15px] leading-[23px]'>
                <p className='hidden md:block'>ログアウト</p>
                <div className='hidden md:block border border-solid border-[#000000] bg-[#000000] w-[1px] h-[23px]'></div>
                <div
                  className='cursor-pointer'
                  onClick={logoutHandler}>
                  <p>山田 太郎 様</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          <main>
            {children}
          </main>
          <footer className='hidden sm:block h-[60px]'>
            <div className='flex h-full'>
              <div className='bg-[#F8F9FA] border border-solid border-[#E1E1E1] w-2/12	 h-full'>
              </div>
              <div className='w-10/12	 bg-[#fff] border border-solid border-[#E1E1E1] h-full flex items-center'>
                <p className='text-xs pl-8'>@2022 Hexabase</p>
              </div>
            </div>
          </footer>
        </>
      </body>
    </html>
  )
}
