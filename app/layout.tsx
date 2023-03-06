'use client'

import Image from 'next/image'
import './globals.css'
import DehazeIcon from '@mui/icons-material/Dehaze';
import RegistrationButton from 'components/components/administratorRegistration/button';
import { useState } from 'react';
import { SPMenus } from 'components/components/layout/spMenus';
import RegistrationModal from 'components/components/administratorRegistration/registrationModal';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showRegister, setShowRegister] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const handleCloseRegister = () => {
    setShowRegister(false)
  }
  const handleCloseDrawer = () => {
    setShowMenu(false)
  }
  return (
    <html lang="en">
      <head />
      <body id='__next'>
        <header>
          <div className='container-responsive'>
            <div className='flex items-center justify-between py-5'>
              <Image src='/logo.png' width={159} height={43.06} alt='logo' />
              <RegistrationButton />
              <div
                onClick={() => setShowMenu(!showMenu)}
                className='sm:hidden'>
                <DehazeIcon />
              </div>
            </div>
          </div>
          <SPMenus showMenu={showMenu} handleClose={handleCloseDrawer} setShowRegister={setShowRegister} />
        </header>

        <>
          <main>
            {children}
          </main>
          <RegistrationModal open={showRegister} handleClose={handleCloseRegister} />
          <footer className='hidden sm:bg-[#F2F2F2] sm:flex sm:flex-col sm:items-center sm:px-60 sm:py-8 sm:gap-y-[60px]'>
            <div>
              <Image alt='logo' src='/logoFooter.svg' width={93} height={91} />
            </div>
            <div className='flex items-center justify-between gap-x-9'>
              <p>ホーム</p>
              <p>ログイン</p>
              <p>会員登録</p>
              <p>プライバシーポリシー</p>
            </div>
            <div>
              <p>©️2022 Hexabase</p>
            </div>
          </footer>
        </>
      </body>
    </html>
  )
}
