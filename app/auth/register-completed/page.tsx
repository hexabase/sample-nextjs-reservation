'use client'
import Image from 'next/image';

const RegisterCompleted = () => {
  return (
    <div className='text-center py-[150px]'>
      <Image alt='logo' src='/logoAdministrator.png' width={233} height={112} className='inline-block mb-[60px]' />
      <p className='font-bold text-2xl mb-[26px] leading-[34px]'>管理者登録が完了しました</p>
      <p className='mb-10 text-sm'>下のボタンよりログインページにおすすみください。</p>

      <button className='px-[60px] py-[10px] bg-[#ffffff] border border-solid border-[#BA00FF] rounded-[50px]'>
        <p className='text-2xl font-medium text-[#BA00FF]'>ログイン</p>
      </button>
    </div>
  )
}

export default RegisterCompleted