import { TJob } from "components/types/common"
import Image from "next/image"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DrawerReservation } from "../drawer";
import { useState } from "react";
export interface ICardMobile {
  jobs: TJob[]
}
const CardMobile = ({ jobs }: ICardMobile) => {
  const [jobInfo, setJobInfor] = useState<TJob>()
  const [showDrawer, setShowDrawer] = useState(false)
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCardClick = (job: TJob) => {
    setJobInfor(job)
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
          {jobs?.map((job) => (
            <div
              key={job.id}
              onClick={() => handleCardClick(job)}
              className="p-5 gap-[10px] rounded-[4px] flex flex-col bg-[#ffffff]">
              <div className="flex flex-col justify-center gap-5">
                <Image alt="image" src='/work.svg' width={313} height={180} />

                <div className="flex flex-col justify-center gap-3 text-sm">
                  <p className="font-medium ">{job?.title}</p>
                  <p className="font-bold ">{job?.name}</p>
                  <p>{job?.position}</p>
                  <div className="flex gap-[6px] items-center">
                    <AccessTimeIcon />
                    <p>{job?.day}</p>
                  </div>

                  <div className="pt-5 flex flex-wrap gap-[8px]">
                    {job?.time.map((t, index) => (
                      <div
                        key={index}
                        className={`rounded-[12.5px] py-[2px] px-4 gap-[10px] ${t.isFull ? 'bg-[#00FFB0] text-[#000000]' :
                          'bg-[#808080] text-[#fff]'}`}>
                        {t.time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      <DrawerReservation open={showDrawer} onClose={toggleDrawer} jobInfo={jobInfo} />
    </>
  )
}

export default CardMobile