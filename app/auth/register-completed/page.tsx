'use client'
import { FooterMobile } from 'components/components/footerMobile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const RegisterCompleted = () => {
  const router = useRouter()
  const handleClickButton = () => {
    router.push('auth/login')
  }
  return (
    <>
      <div className='text-center py-[150px]'>
        <Image alt='logo' src='/logoAdministrator.svg' width={233} height={112} className='inline-block mb-[60px]' />
        <p className='font-bold text-2xl mb-[26px] leading-[34px]'>管理者登録が完了しました</p>
        <p className='mb-10 text-sm'>下のボタンよりログインページにおすすみください。</p>

        <button
          onClick={() => handleClickButton()}
          className='px-[60px] py-[10px] bg-[#ffffff] border 
      border-solid border-[#BA00FF] rounded-[50px] hover:bg-[#BA00FF]
      text-[#BA00FF] hover:text-[#fff]'>
          <p className='text-2xl font-medium '>ログイン</p>
        </button>
      </div>
      <FooterMobile />
    </>
  )
}

export default RegisterCompleted