import { useState } from "react";
import RegistrationModal from "../registrationModal";
import { useRouter } from "next/navigation";

const RegistrationButton = () => {

  const [open, setOpen] = useState(false);
  const router = useRouter()
  const handleClick = () => {
    router.push('auth/login')
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };
  return (
    <>
      <div className='hidden sm:flex sm:items-center sm:gap-x-[22px]'>
        <div className='cursor-pointer'
          onClick={() => handleOpen()}
        >
          <p className='text-sm font-bold'>管理者登録</p>
        </div>
        <button
          onClick={() => handleClick()}
          className='button-header'>
          ログイン
        </button>
      </div>
      <RegistrationModal handleOpen={handleOpen} handleClose={handleClose} open={open} />
    </>
  )
}

export default RegistrationButton