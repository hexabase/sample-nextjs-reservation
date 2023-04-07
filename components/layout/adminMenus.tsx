import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export interface IAdminMenus {
  listPage: boolean;
}

const AdminMenus = ({ listPage }: IAdminMenus) => {
  return (
    <>
      <div className='h-[94px] px-[60px] pb-[25px] bg-[#808080] sm:hidden flex justify-between items-center'>
        <div
          className={`${
            listPage ? 'text-[#fff]' : 'text-[#fff]/[0.5]'
          } flex flex-col items-center gap-1`}
        >
          <CalendarMonthIcon />
          <p className='text-xs'>アジェンダ一覧</p>
        </div>
        <div className='text-[#fff]/[0.5] flex flex-col items-center gap-1'>
          <LogoutIcon />
          <p className='text-xs'>ログアウト</p>
        </div>
      </div>
    </>
  );
};

export default AdminMenus;
