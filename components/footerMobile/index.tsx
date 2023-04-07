'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

import SearchArea from '../layout/searchArea';
export const FooterMobile = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleSearchArea = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };
  const token = getCookie('token');
  const router = useRouter();
  const handleAccountButton = () => {
    router.push('/administrator');
  };

  return (
    <>
      <div className='container-responsive fixed bottom-0 left-0 z-[9999] h-24 bg-[#ba00ff] sm:hidden'>
        <div className='flex items-center justify-around gap-3 px-3 pt-6 pb-14'>
          <Link href='/'>
            <div className='flex flex-col items-center text-[#fff] text-xs gap-y-2'>
              <HomeIcon />
              <p>ホーム</p>
            </div>
          </Link>
          <div
            onClick={() => handleSearchArea()}
            className='flex flex-col items-center text-[#fff] text-xs gap-y-2'
          >
            <SearchIcon />
            <p>検索</p>
          </div>
          {token && (
            <div
              className='flex flex-col items-center text-[#fff] text-xs gap-y-2'
              onClick={() => handleAccountButton()}
            >
              <PersonIcon />
              <p>アカウント</p>
            </div>
          )}
        </div>
      </div>
      <SearchArea isSearchOpen={isSearchOpen} onClose={handleCloseSearch} />
    </>
  );
};
