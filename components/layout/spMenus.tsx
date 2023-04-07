import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Drawer } from '@material-ui/core';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface ISPMenus {
  showMenu?: boolean;
  handleClose: () => void;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
}

export const SPMenus = ({ showMenu, handleClose, setShowRegister }: ISPMenus) => {
  const token = getCookie('token');

  const router = useRouter();
  const handleAgendaButton = () => {
    router.push('administrator');
  };
  const handleLoginButton = () => {
    router.push('auth/login');
  };

  return (
    <>
      <Drawer
        open={showMenu}
        anchor='right'
        PaperProps={{
          className: 'w-full h-screen',
        }}
        onClose={() => handleClose()}
      >
        <div className='bg-[#F5F5F5] h-full sm:hidden'>
          <div className='flex justify-between items-center p-5 '>
            <Link href='/'>
              <Image alt='logo' src='/logo.svg' width={120} height={24} />
            </Link>
            <CloseIcon onClick={() => handleClose()} className='w-6 h-5' />
          </div>
          <div className='pt-10'>
            <div className='grid grid-cols-1 '>
              <div className='pb-10'>
                <div className='p-[10px] border-b border-b-[#E1E1E1]'>
                  <p className='text-[#808080] text-base font-medium'>管理者</p>
                </div>
                {token ? (
                  <div
                    className='p-[10px] flex justify-between items-center text-[#BA00FF]'
                    onClick={() => {
                      handleClose();
                      handleAgendaButton();
                    }}
                  >
                    <p className='font-medium text-base'>アジェンダ一覧</p>
                    <KeyboardArrowRightIcon className='w-5 h-5' />
                  </div>
                ) : (
                  <>
                    <div
                      className='p-[10px] flex justify-between items-center text-[#BA00FF]'
                      onClick={() => {
                        handleClose();
                        handleLoginButton();
                      }}
                    >
                      <p className='font-medium text-base'>ログイン</p>
                      <KeyboardArrowRightIcon className='w-5 h-5' />
                    </div>

                    <div
                      className='p-[10px] flex justify-between items-center text-[#BA00FF]'
                      onClick={() => {
                        handleClose();
                        setShowRegister(true);
                      }}
                    >
                      <p className='font-medium text-base'>管理者登録</p>
                      <KeyboardArrowRightIcon className='w-5 h-5' />
                    </div>
                  </>
                )}
              </div>

              <div className='p-[10px] text-sm font-medium border-t border-t-[#E1E1E1] flex flex-col gap-4'>
                <a href='https://www.hexabase.com/' target='_blank' rel='noreferrer'>
                  <p>運営会社</p>
                </a>
                <a href='https://www.hexabase.com/privacy-policy/' target='_blank' rel='noreferrer'>
                  <p>プライバシーポリシー</p>
                </a>
                <a href='https://www.hexabase.com/contact-us/' target='_blank' rel='noreferrer'>
                  <p>お問い合わせ</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
