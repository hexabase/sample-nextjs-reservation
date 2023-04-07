'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecruiterContext } from '../../../context';
import { EMessageError, ETypeStatus, TNotification } from 'components/types/common';
import { logout } from 'components/utils/api';
import { deleteCookie } from 'cookies-next';

export default function Header() {
  const { recruiter } = useRecruiterContext();
  const [notification, setNotification] = useState<TNotification>({
    open: false,
  });
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie('token');
    router.push('/auth/login');
  };
  const logoutHandler = async () => {
    try {
      const res = await logout();
      res.data && handleLogout();
    } catch (error) {
      setNotification({
        open: true,
        type: ETypeStatus.ERROR,
        message: EMessageError.ERR_01,
      });
    }
  };

  return (
    <>
      <div>
        <div className='px-4 border-b border-solid border-[#E1E1E1]'>
          <div className='flex items-center justify-between py-5'>
            <Image
              src='/logoForAdministrator.svg'
              width={297}
              height={43.06}
              alt='logo'
              className='w-[197px] h-[28px] md:w-[297px] md:h-[43px]'
            />
            <div className='flex gap-[15px] leading-[23px]'>
              <p className='cursor-pointer' onClick={logoutHandler}>
                ログアウト
              </p>
              <div className='hidden md:block border border-solid border-[#000000] bg-[#000000] w-[1px] h-[23px]'></div>
              <div className='hidden md:block'>
                <p>{recruiter?.name} 様</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
