'use client';

import '../../globals.css';
import Header from './header';
import AdministratorContainer from '../../../container/administratorContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <AdministratorContainer>
          <Header />
          <ThemeProvider theme={theme}>
            <main>{children}</main>
          </ThemeProvider>
          <footer className='hidden sm:block h-[60px]'>
            <div className='flex h-full'>
              <div className='bg-[#F8F9FA] border border-solid border-[#E1E1E1] w-2/12	 h-full'></div>
              <div className='w-10/12	 bg-[#fff] border border-solid border-[#E1E1E1] h-full flex items-center'>
                <p className='text-xs pl-8'>&copy; Hexabase</p>
              </div>
            </div>
          </footer>
        </AdministratorContainer>
      </body>
    </html>
  );
}
