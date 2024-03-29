'use client';

import '../globals.css';
import Link from 'next/link';
import Image from 'next/image';
import DehazeIcon from '@mui/icons-material/Dehaze';
import RegistrationButton from 'components/components/administratorRegistration/button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { SPMenus } from 'components/components/layout/spMenus';
import RegistrationModal from 'components/components/administratorRegistration/registrationModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showRegister, setShowRegister] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const handleCloseRegister = () => {
    setShowRegister(false);
  };
  const handleCloseDrawer = () => {
    setShowMenu(false);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#BA00FF',
      },
    },
  });

  return (
    <html lang='ja'>
      <head />
      <body id='__next'>
        <header>
          <div className='container-responsive'>
            <div className='flex items-center justify-between py-5'>
              <Link href='/'>
                <Image alt='logo' src='/logo.svg' width={159} height={43.06} />
              </Link>
              <RegistrationButton />
              <div onClick={() => setShowMenu(!showMenu)} className='sm:hidden'>
                <DehazeIcon />
              </div>
            </div>
          </div>
          <SPMenus
            showMenu={showMenu}
            handleClose={handleCloseDrawer}
            setShowRegister={setShowRegister}
          />
        </header>

        <>
          <ThemeProvider theme={theme}>
            <main>{children}</main>
          </ThemeProvider>

          <RegistrationModal open={showRegister} handleClose={handleCloseRegister} />

          <footer className='hidden sm:bg-[#F2F2F2] sm:flex sm:flex-col sm:items-center sm:py-8 sm:gap-y-[60px]'>
            <div>
              <Image alt='logo' src='/logoFooter.svg' width={93} height={91} />
            </div>
            <div className='flex items-center justify-between gap-x-9'>
              <Link href='/'>
                <p>ホーム</p>
              </Link>
              <Link href='/auth/login'>
                <p>ログイン</p>
              </Link>
              <a href='https://www.hexabase.com/privacy-policy/' target='_blank' rel='noreferrer'>
                <p>プライバシーポリシー</p>
              </a>
            </div>
            <div>
              <p>&copy; Hexabase</p>
            </div>
          </footer>
        </>
      </body>
    </html>
  );
}
