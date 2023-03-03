'use client'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
export const FooterMobile = () => {
  return (
    <div className="container-responsive fixed bottom-0 left-0 z-20 h-24 bg-[#ba00ff] sm:hidden">
      <div className="flex items-center justify-around gap-3 px-3 pt-6 pb-14">
        <div className='flex flex-col items-center text-[#fff] text-xs gap-y-2'>
          <HomeIcon />
          <p>ホーム</p>

        </div>
        <div className='flex flex-col items-center text-[#fff] text-xs gap-y-2'>
          <SearchIcon />
          <p>検索</p>
        </div>
        <div className='flex flex-col items-center text-[#fff] text-xs gap-y-2'>
          <PersonIcon />
          <p>アカウント</p>
        </div>
      </div>
    </div>
  )
}