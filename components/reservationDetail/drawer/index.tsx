import { useState } from 'react';
import { Drawer } from '@mui/material';
import { TFieldValueConvert } from 'components/types/common';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';
import { converTime, getYearMonthDayJP } from 'components/utils/getDay';
export interface IDrawerReservation {
  open: boolean;
  onClose: () => void;
  reservationInfo?: TFieldValueConvert;
  imageUrl?: string;
}
export const DrawerReservation = ({
  open,
  onClose,
  reservationInfo,
  imageUrl,
}: IDrawerReservation) => {
  const [tab, setTab] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState('');

  const handleChangeStatusTab = () => {
    setTab(false);
  };
  const handleChangeTab = () => {
    setTab(true);
  };
  const handleExpandedInfo = (id: string) => {
    setExpandedInfo(!expandedInfo);
    setExpandedIndex(id === expandedIndex ? '' : id);
  };
  return (
    <>
      <Drawer
        anchor='right'
        open={open}
        onClose={onClose}
        PaperProps={{
          style: { width: '100%', maxWidth: '600px' },
          className: 'sm:w-auto"',
        }}
      >
        <div className='py-3 border-t border-b border-[#E1E1E1] px-6 mt-14 text-right md:text-left'>
          <KeyboardTabIcon onClick={() => onClose()} className='cursor-pointer hover:opacity-40' />
        </div>

        <div className='text-2xl font-bold leading-[34px] py-6 border-b border-[#E1E1E1] px-10'>
          <EventAvailableIcon />
          {getYearMonthDayJP(reservationInfo?.date)}
        </div>

        <div className='pt-4'>
          <div className='text-center mb-4'>
            <Image
              alt='image'
              src={imageUrl ?? ''}
              width={300}
              height={200}
              className='rounded-[10px] inline-block'
            />
          </div>
          <div className='text-xl font-bold pt-[10px] pb-[57px] pr-10 pl-10'>
            {reservationInfo?.title}
          </div>
        </div>

        <div>
          <ul
            className='flex text-xl font-bold text-gray  
          pt-[5px] px-[10px] transition-all w-full
          gap-[11px] border-b border-b-[#E1E1E1] mb-5'
          >
            <li
              className={` w-1/2 flex justify-center 
             cursor-pointer  
              ${!tab ? 'border-b border-b-mainColor text-mainColor ' : ''}`}
              onClick={() => handleChangeStatusTab()}
            >
              予約状況
            </li>
            <li
              className={`flex justify-center w-1/2 cursor-pointer
            transition duration-700
             ${tab ? 'border-b border-b-mainColor text-mainColor' : ''}
            `}
              onClick={() => handleChangeTab()}
            >
              予約概要
            </li>
          </ul>
        </div>

        <div className='pt-5 pb-[57px] pl-10 pr-[57px] w-full'>
          {tab ? (
            <p className='text-sm'>{reservationInfo?.reservation_detail}</p>
          ) : (
            <div>
              {reservationInfo &&
                reservationInfo?.time?.map((t: any, index: string) => {
                  const subscriber = reservationInfo.subscribers.find((subscriber: any) => {
                    return subscriber.time == t.field_id.replace('time_', '');
                  });
                  console.log(subscriber);
                  return (
                    <div
                      key={index}
                      className={`w-full px-5 py-[10px] text-[#000000] mb-4 ${
                        subscriber ? 'bg-secondMainColor' : 'bg-[#E1E1E1] text-[#000000]'
                      } `}
                    >
                      <div className='w-full flex justify-between'>
                        <div className='flex w-[80px] justify-between'>
                          <div className='w-[20px]'>
                            {' '}
                            <PersonIcon className={`${subscriber ? 'block' : 'hidden'}`} />
                          </div>
                          <div>
                            <p className='font-bold text-lg'>{converTime(t.field_id)}</p>
                          </div>
                        </div>
                        {subscriber ? (
                          <KeyboardArrowDownIcon
                            className='cursor-pointer'
                            onClick={() => handleExpandedInfo(index)}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                      {expandedIndex === index && (
                        <div className='mt-[30px] bg-[#fff] p-4 mb-2 '>
                          <p>
                            予約者 <span className='font-bold text-base'>{subscriber.name}</span>
                          </p>

                          <div className='flex'>
                            <EmailIcon />
                            <p>{subscriber.email}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};
