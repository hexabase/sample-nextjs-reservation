'use client';
import Image from 'next/image';
import AddCardIcon from '@mui/icons-material/AddCard';
const NoRegister = () => {
  return (
    <div className='pb-24 pt-5 md:pb-0  md:py-[150px] px-5 md:px-[48px] text-center h-screen'>
      <Image
        alt='image'
        src='/imageRegisterPage.svg'
        width={88}
        height={90}
        className='inline-block mt-5 mb-[60px] md:mb-0'
      />
      <p className='font-bold text-base md:text-2xl leading-[35px]'>
        まだアジェンダが１件も登録されていません
      </p>
      <p className='text-sm mt-[26px] mb-8'>
        新規アジェンダ登録より先ずは１件アジェンダを登録してみましょう。
      </p>
      <button>
        <div
          className='flex py-[10px] px-[30px] gap-2 rounded-[50px] border border-solid border-[#BA00ff] text-[#BA00ff]
        hover:text-[#fff] hover:bg-[#BA00FF]'
        >
          <AddCardIcon />
          <p className='font-bold text-base'>新規アジェンダ登録</p>
        </div>
      </button>
    </div>
  );
};

export default NoRegister;
