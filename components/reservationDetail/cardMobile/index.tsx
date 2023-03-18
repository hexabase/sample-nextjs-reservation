import { TReservationRespond } from "components/types/common"
import Image from "next/image"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DrawerReservation } from "../drawer";
import { useState } from "react";
import { getYearMonthDay } from "components/utils/getDay";
export interface ICardMobile {
  reservationList: TReservationRespond[]
}
const CardMobile = ({ reservationList }: ICardMobile) => {
  const [reservationInfo, setReservationInfor] = useState<TReservationRespond>()
  const [showDrawer, setShowDrawer] = useState(false)
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCardClick = (reservation: TReservationRespond) => {
    setReservationInfor(reservation)
    setShowDrawer(true)
  }
  return (
    <>
      <div>
        <div className="px-5 py-[10px] gap-[7px] border-b border-b-[#E1E1E1]">

          <p className="text-sm font-bold ">アジェンダ一覧</p>
        </div>

        <div className="px-5 py-[10px] gap-[7px] border-b-[#E1E1E1] flex justify-end">
          <p> 全120件</p>
        </div>

        <div className="pt-10 pb-24 px-5 bg-[#F2F2F2] gap-4 flex flex-col items-center">
          {reservationList?.map((reservation) => (
            <div
              key={reservation?.i_id}
              onClick={() => handleCardClick(reservation)}
              className="p-5 gap-[10px] rounded-[4px] flex flex-col bg-[#ffffff]">
              <div className="flex flex-col justify-center gap-5">
                <Image alt="image" src='/work.svg' width={313} height={180} />

                <div className="flex flex-col justify-center gap-3 text-sm">
                  <p className="font-medium ">{reservation?.title}</p>
                  {/* <p className="font-bold ">{reservation?.name}</p>
                  <p>{reservation?.position}</p> */}
                  <div className="flex gap-[6px] items-center">
                    <AccessTimeIcon />
                    <p>{getYearMonthDay(reservation?.date)}</p>
                  </div>

                  <div className="pt-5 flex flex-wrap gap-[8px]">
                    <div
                      className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${reservation?.time_10 == '1' ? 'bg-[#00FFB0] text-[#000000]' : 'bg-[#808080] text-[#fff]'} `}>
                      10.00
                    </div>

                    <div
                      className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${reservation?.time_11 == '1' ? 'bg-[#00FFB0] text-[#000000]' : 'bg-[#808080] text-[#fff]'} `}>
                      11.00
                    </div>

                    <div
                      className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${reservation?.time_12 == '1' ? 'bg-[#00FFB0] text-[#000000]' : 'bg-[#808080] text-[#fff]'} `}>
                      12.00
                    </div>

                    <div
                      className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${reservation?.time_13 == '1' ? 'bg-[#00FFB0] text-[#000000]' : 'bg-[#808080] text-[#fff]'} `}>
                      13.00
                    </div>

                    <div
                      className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${reservation?.time_14 == '1' ? 'bg-[#00FFB0] text-[#000000]' : 'bg-[#808080] text-[#fff]'} `}>
                      14.00
                    </div>

                    <div
                      className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${reservation?.time_15 == '1' ? 'bg-[#00FFB0] text-[#000000]' : 'bg-[#808080] text-[#fff]'} `}>
                      15.00
                    </div>

                    <div
                      className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${reservation?.time_16 == '1' ? 'bg-[#00FFB0] text-[#000000]' : 'bg-[#808080] text-[#fff]'} `}>
                      16.00
                    </div>

                    <div
                      className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${reservation?.time_17 == '1' ? 'bg-[#00FFB0] text-[#000000]' : 'bg-[#808080] text-[#fff]'} `}>
                      17.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      <DrawerReservation open={showDrawer} onClose={toggleDrawer} reservationInfo={reservationInfo} />
    </>
  )
}

export default CardMobile