import { Button, TableCell, TableRow } from "@mui/material"
import { TReservationRespond } from "components/types/common"
import { getFile } from "components/utils/api"
import { getYearMonthDayJP } from "components/utils/getDay"
import Image from "next/image"
import { useEffect, useState } from "react"
export interface IReservationRow {
  job: TReservationRespond,
  handleRowOver: (rowIndex: string) => void,
  handleRowLeave: () => void,
  handleRowClick: (id: string) => Promise<void>,
  hoveredRowIndex: string,
}

const ReservationRow = ({ job, handleRowOver, handleRowLeave, handleRowClick, hoveredRowIndex }: IReservationRow) => {
  const [imageUrl, setImageUrl] = useState<string>();
  console.log('imageUrl', imageUrl)
  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await getFile(job.image)
        const imageBytes = new Uint8Array(res.data);
        const blob = new Blob([imageBytes.buffer], { type: 'image' });
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } catch (error) {
        throw error
      }
    }
    getImage()

  }, [job])
  return (
    <TableRow
      onMouseEnter={() => handleRowOver(job?.i_id)}
      onMouseLeave={() => handleRowLeave()}
      className="bg-gray-100 mb-4"
      onClick={async () => await handleRowClick(job.i_id)}
      key={job?.i_id}
      sx={{
        '& td, & th': {
          borderTop: "1px solid #ccc",
          borderBottom: "1px solid #ccc"
        },
        'th': { borderLeft: "1px solid #ccc" },
        ' &:not(:last-child)': { marginBottom: '4px' },
        backgroundColor: job?.i_id === hoveredRowIndex ? '#00FFB0' : 'transparent',
        cursor: hoveredRowIndex ? 'pointer' : null,
        transition: 'background-color 0.3s ease',
      }}
    >
      <TableCell component="th" scope="row" align='left' className="px-3" >
        <div className='flex items-center gap-x-4 '>
          {!imageUrl ? (<>
            <Image src='/work.svg' alt='image' width={100} height={62} className='md:w-[60px] md:h-[42px] lg:w-[100px] lg:h-[62px]' />
          </>) : (
            <Image src={imageUrl} alt='image' width={100} height={62} className='md:w-[60px] md:h-[42px] lg:w-[100px] lg:h-[62px]' />
          )}
          <p className='font-bold text-overflow-threeline-ellipsis'>{job?.title}</p>
        </div>
      </TableCell>
      <TableCell align='left' className="px-3" >
        <p className='font-sans font-bold'>
          山田　太郎
        </p>

      </TableCell>
      <TableCell align="left" className="px-3"  >
        <p className='font-sans font-bold'>CEO</p>

      </TableCell>
      <TableCell align="left" className="px-3"  >
        <p className='font-sans font-bold'>
          {getYearMonthDayJP(job?.date)}
        </p>

      </TableCell>
      <TableCell align="left" sx={{ borderRight: "1px solid #ccc" }} className="px-3" >
        <div className='flex flex-wrap gap-4'>
          {job.time_10 == '1' ?
            <Button
              className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_10 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
            >
              <p className=" font-bold font-sans text-sm">
                10:00
              </p>
            </Button> : null}

          {job.time_11 == '1' ?
            <Button
              className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_11 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
            >
              <p className=" font-bold font-sans text-sm">
                11:00
              </p>
            </Button> : null}

          {job.time_12 == '1' ?
            <Button
              className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_12 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
            >
              <p className=" font-bold font-sans text-sm">
                12:00
              </p>
            </Button> : null}

          {job.time_13 == '1' ?
            <Button
              className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_13 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
            >
              <p className=" font-bold font-sans text-sm">
                13:00
              </p>
            </Button> : null}

          {job.time_14 == '1' ?
            <Button
              className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_14 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
            >
              <p className=" font-bold font-sans text-sm">
                14:00
              </p>
            </Button> : null}

          {job.time_15 == '1' ?
            <Button
              className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_15 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
            >
              <p className=" font-bold font-sans text-sm">
                15:00
              </p>
            </Button> : null}

          {job.time_16 == '1' ?
            <Button
              className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_16 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
            >
              <p className=" font-bold font-sans text-sm">
                16:00
              </p>
            </Button> : null}

          {job.time_17 == '1' ?
            <Button
              className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_17 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
            >
              <p className=" font-bold font-sans text-sm">
                17:00
              </p>
            </Button> : null}
        </div>
      </TableCell>
    </TableRow>
  )
}

export default ReservationRow