import { useState } from 'react';
import { Drawer, Button } from '@mui/material';
import { TJob } from 'components/types/common';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';
export interface IDrawerReservation {
  open: boolean,
  onClose: () => void,
  jobInfo?: TJob
}
export const DrawerReservation = ({ open, onClose, jobInfo }: IDrawerReservation) => {
  const [tab, setTab] = useState(false)
  const [expandedInfo, setExpandedInfo] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState('');

  const handleChangeStatusTab = () => {
    setTab(false)
  }
  const handleChangeTab = () => {
    setTab(true)

  }
  const handleExpandedInfo = (id: string) => {
    setExpandedInfo(!expandedInfo)
    setExpandedIndex(id === expandedIndex ? '' : id)
  }
  return (
    <>

      <Drawer anchor="right" open={open} onClose={onClose}
        PaperProps={{ style: { width: 600 } }}

      >
        <div className='py-3 border-t border-b border-[#E1E1E1] px-6 mt-14'>
          <KeyboardTabIcon onClick={() => onClose()} className='cursor-pointer hover:opacity-40' />
        </div>

        <div className='text-2xl font-bold leading-[34px] py-6 border-b border-[#E1E1E1] px-10'>
          <EventAvailableIcon />
          {jobInfo?.day}
        </div>

        <div className='pt-4'>
          <div className='text-center mb-4'>

            <Image alt='image' src='/working.jpg' width={300} height={200} className='rounded-[10px] inline-block' />
          </div>
          <div className='text-xl font-bold pt-[10px] pb-[57px] pr-10 pl-10'>
            {jobInfo?.title}
          </div>
        </div>

        <div >
          <ul className='flex text-xl font-bold text-gray  
          pt-[5px] px-[10px] transition-all
          gap-[11px] border-b border-b-[#E1E1E1] mb-5'>
            <li className={`text-mainColor w-1/2 flex justify-center 
             cursor-pointer  
              ${!tab ? 'border-b border-b-mainColor ' : ''}`}
              onClick={() => handleChangeStatusTab()}
            >予約状況</li>
            <li className={`flex justify-center w-1/2 cursor-pointer
            transition duration-700
             ${tab ? 'border-b border-b-mainColor' : ''}
            `}
              onClick={() => handleChangeTab()}
            >予約概要</li>
          </ul>
        </div>

        <div className='pt-5 pb-[57px] pl-10 pr-[57px]'>
          {tab ? <p className='text-sm'>
            スタートアップのプロダクト開発に興味がある方、お話ししましょう！スタートアップのプロダクト開発に興味がある方、
            お話ししましょう！スタートアップのプロダクト開発に興味がある方、
            お話ししましょう！スタートアップのプロダクト開発に興味がある方、
            お話ししましょう！スタートアップのプロダクト開発に興味がある方、
            お話ししましょう！スタートアップのプロダクト開発に興味がある方、
            お話ししましょう！スタートアップのプロダクト開発に興味がある方、
            お話ししましょう！スタートアップのプロダクト開発に興味がある方、
            お話ししましょう！スタートアップのプロダクト開発に興味がある方、
            お話ししましょう！
          </p> :
            <div>
              {jobInfo?.time.map((t, index) => (
                <div className={`w-full px-5 py-[10px] text-[#000000] mb-4 ${t.isFull ? 'bg-secondMainColor' : 'bg-[#E1E1E1]'} `}>
                  <div className='w-full flex justify-between'>
                    <div className='flex w-[80px] justify-between'>
                      <div className='w-[20px]'>{t.isFull ? <PersonIcon /> : ""}</div>
                      <div><p className='font-bold text-lg'>{t?.time}</p></div>
                    </div>
                    {t.isFull && <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => handleExpandedInfo(String(index))} />}
                  </div>
                  <div className='mt-[30px] bg-[#fff] p-4 mb-2' style={{
                    display: String(index) === expandedIndex ?
                      'block' : 'none'
                  }}>
                    <p>予約者 <span className='font-bold text-base'>藤岡 修一</span></p>
                    <div className='flex'>
                      <EmailIcon />
                      <p>sample@gmail.com</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </Drawer>
    </>
  );
}