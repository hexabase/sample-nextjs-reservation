
import Paper from '@mui/material/Paper';
import { TFieldValueConvert, TJob, TReservationRespond } from 'components/types/common';
import { Button, Theme } from '@mui/material';
import Image from 'next/image'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { useEffect, useState } from 'react';
import { DrawerReservation } from '../reservationDetail/drawer';
import { makeStyles } from '@material-ui/core/styles';
import { getItemDetails } from 'components/utils/api';

export interface ITableData {
  jobs: TReservationRespond[]
}

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
});


export default function TableData({ jobs }: ITableData) {

  const [hoveredRowIndex, setHoveredRowIndex] = useState('');
  const [showDrawer, setShowDrawer] = useState(false)
  const [reservationInfo, setReservationInfor] = useState<TFieldValueConvert>()
  const classes = useStyles();

  const handleRowOver = (rowIndex: string) => {
    setHoveredRowIndex(rowIndex);
  };
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const handleRowLeave = () => {
    setHoveredRowIndex('');
  };

  const handleRowClick = async (id: string) => {
    console.log('id', id)
    const res = await getItemDetails(id)
    console.log('respond', res)
    console.log('res', res?.data.field_values)
    if (res.data && res.data.field_values) {
      const dataConvert: TFieldValueConvert = {};
      for (let item in res.data.field_values) {
        dataConvert[res.data.field_values[item].field_id] = res.data.field_values[item].value
      }
      setReservationInfor(dataConvert)
    }
    setShowDrawer(true)
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 'unset' }}>
        <Table sx={{ minWidth: 650, }} aria-label="simple table" className='border-separate border-spacing-y-6'>
          <TableHead>
            <TableRow
              className='bg-[#E1E1E1]'
            >
              <TableCell style={{ width: '25%' }} className='text-[#000000] font-sans' align='center'>
                <div className='flex items-center gap-1'>
                  <p>
                    タイトル
                  </p>
                  <UnfoldLessIcon fontSize='small' />
                </div>
              </TableCell>

              <TableCell style={{ width: '12%' }} className='text-[#000000] font-sans' align='center'>
                <div className='flex items-center gap-1'>
                  <p>
                    名前
                  </p>
                  <UnfoldLessIcon fontSize='small' />
                </div>
              </TableCell>
              <TableCell style={{ width: '12%' }} className='text-[#000000] font-sans' align="left">
                <div className='flex items-center gap-1'>
                  <p>
                    肩書き
                  </p>
                  <UnfoldLessIcon fontSize='small' />
                </div>
              </TableCell>
              <TableCell style={{ width: '8%' }} className='text-[#000000] font-sans' align="left">
                <div className='flex items-center gap-1'>
                  <p>
                    日程
                  </p>
                  <UnfoldLessIcon fontSize='small' />
                </div>
              </TableCell>
              <TableCell style={{ width: '22%' }} className='text-[#000000] font-sans' align="left">
                <div className='flex items-center gap-1'>
                  <p>
                    時間
                  </p>
                  <UnfoldLessIcon fontSize='small' />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs && jobs.map((job) => (
              <>
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
                      <Image src='/work.svg' alt='image' width={100} height={62} className='md:w-[60px] md:h-[42px] lg:w-[100px] lg:h-[62px]' />
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
                      {job?.date}
                    </p>

                  </TableCell>
                  <TableCell align="left" sx={{ borderRight: "1px solid #ccc" }} className="px-3" >
                    <div className='flex flex-wrap gap-4'>
                      {/* {job?.time.map((d, index) => (
                        <Button key={index}
                          disabled={!d.isFull}
                          className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${d.isFull ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                        >
                          <p className=" font-bold font-sans text-sm">
                            {d.time}
                          </p>
                        </Button>
                      ))} */}
                      {job.time_10 == '1' ? <Button
                        // disabled={!d.isFull}
                        className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_10 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                      >
                        <p className=" font-bold font-sans text-sm">
                          10:00
                        </p>
                      </Button> : null}

                      {job.time_11 == '1' ? <Button
                        // disabled={!d.isFull}
                        className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_11 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                      >
                        <p className=" font-bold font-sans text-sm">
                          11:00
                        </p>
                      </Button> : null}

                      {job.time_12 == '1' ? <Button
                        // disabled={!d.isFull}
                        className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_12 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                      >
                        <p className=" font-bold font-sans text-sm">
                          12:00
                        </p>
                      </Button> : null}

                      {job.time_13 == '1' ? <Button
                        // disabled={!d.isFull}
                        className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_13 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                      >
                        <p className=" font-bold font-sans text-sm">
                          13:00
                        </p>
                      </Button> : null}

                      {job.time_14 == '1' ? <Button
                        // disabled={!d.isFull}
                        className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_14 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                      >
                        <p className=" font-bold font-sans text-sm">
                          14:00
                        </p>
                      </Button> : null}

                      {job.time_15 == '1' ? <Button
                        // disabled={!d.isFull}
                        className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_15 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                      >
                        <p className=" font-bold font-sans text-sm">
                          15:00
                        </p>
                      </Button> : null}

                      {job.time_16 == '1' ? <Button
                        // disabled={!d.isFull}
                        className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_16 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                      >
                        <p className=" font-bold font-sans text-sm">
                          16:00
                        </p>
                      </Button> : null}

                      {job.time_17 == '1' ? <Button
                        // disabled={!d.isFull}
                        className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${job.time_17 === '1' ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                      >
                        <p className=" font-bold font-sans text-sm">
                          17:00
                        </p>
                      </Button> : null}
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer >

      <DrawerReservation open={showDrawer} onClose={toggleDrawer} reservationInfo={reservationInfo} />
    </>
  );
}