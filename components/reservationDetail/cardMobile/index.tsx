import { TFieldValueConvert } from 'components/types/common';
import Image from 'next/image';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DrawerReservation } from '../drawer';
import { useEffect, useState } from 'react';
import { getYearMonthDay } from 'components/utils/getDay';
import { getFile, getItemDetails } from 'components/utils/api';
export interface ICardMobile {
  reservation: any;
}

const CardMobile = ({ reservation }: ICardMobile) => {
  const [reservationInfo, setReservationInfor] = useState<TFieldValueConvert>();
  const [showDrawer, setShowDrawer] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCardClick = async (id: string) => {
    const res = await getItemDetails(id);
    const times: { field_id: string; value: string }[] = [];
    if (res.data && res.data.field_values) {
      const dataConvert: TFieldValueConvert = {};
      for (const item in res.data.field_values) {
        if (item.startsWith('time')) {
          times?.push({
            field_id: res.data.field_values[item].field_id,
            value: res.data.field_values[item].value,
          });
          dataConvert['time'] = times;
        } else {
          dataConvert[res.data.field_values[item].field_id] = res.data.field_values[item].value;
        }
      }
      if (res.data.linked_items.subscribers) {
        dataConvert['subscribers'] = res.data.linked_items.subscribers.items;
      }
      setReservationInfor(dataConvert);
    }
    setShowDrawer(true);
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await getFile(reservation.image);
        const imageBytes = new Uint8Array(res.data);
        const blob = new Blob([imageBytes.buffer], { type: 'image' });
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } catch (error) {
        throw error;
      }
    };
    getImage();
  }, [reservation]);

  return (
    <>
      <div
        onClick={() => handleCardClick(reservation?.i_id)}
        className='p-5 gap-[10px] rounded-[4px] flex flex-col bg-[#ffffff]'
      >
        <div className='flex flex-col justify-center gap-5'>
          <Image alt='image' src={imageUrl ?? '/img-default.png'} width={313} height={180} />

          <div className='flex flex-col justify-center gap-3 text-sm'>
            <p className='font-medium'>{reservation?.title}</p>
            <p className='font-bold '>{reservation?.lookup_items.recruiter.name}</p>
            <p className='font-medium'>{reservation?.lookup_items.recruiter.position}</p>
            <div className='flex gap-[6px] items-center'>
              <AccessTimeIcon />
              <p>{getYearMonthDay(reservation?.date)}</p>
            </div>

            <div className='pt-5 flex flex-wrap gap-[8px]'>
              <div
                className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${
                  reservation?.time_10 == '1'
                    ? 'bg-[#00FFB0] text-[#000000]'
                    : 'bg-[#808080] text-[#fff]'
                } `}
              >
                10.00
              </div>

              <div
                className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${
                  reservation?.time_11 == '1'
                    ? 'bg-[#00FFB0] text-[#000000]'
                    : 'bg-[#808080] text-[#fff]'
                } `}
              >
                11.00
              </div>

              <div
                className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${
                  reservation?.time_12 == '1'
                    ? 'bg-[#00FFB0] text-[#000000]'
                    : 'bg-[#808080] text-[#fff]'
                } `}
              >
                12.00
              </div>

              <div
                className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${
                  reservation?.time_13 == '1'
                    ? 'bg-[#00FFB0] text-[#000000]'
                    : 'bg-[#808080] text-[#fff]'
                } `}
              >
                13.00
              </div>

              <div
                className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${
                  reservation?.time_14 == '1'
                    ? 'bg-[#00FFB0] text-[#000000]'
                    : 'bg-[#808080] text-[#fff]'
                } `}
              >
                14.00
              </div>

              <div
                className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${
                  reservation?.time_15 == '1'
                    ? 'bg-[#00FFB0] text-[#000000]'
                    : 'bg-[#808080] text-[#fff]'
                } `}
              >
                15.00
              </div>

              <div
                className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${
                  reservation?.time_16 == '1'
                    ? 'bg-[#00FFB0] text-[#000000]'
                    : 'bg-[#808080] text-[#fff]'
                } `}
              >
                16.00
              </div>

              <div
                className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${
                  reservation?.time_17 == '1'
                    ? 'bg-[#00FFB0] text-[#000000]'
                    : 'bg-[#808080] text-[#fff]'
                } `}
              >
                17.00
              </div>
            </div>
          </div>
        </div>
      </div>
      <DrawerReservation
        open={showDrawer}
        onClose={toggleDrawer}
        reservationInfo={reservationInfo}
        imageUrl={imageUrl}
      />
    </>
  );
};

export default CardMobile;
