
import Paper from '@mui/material/Paper';
import { TJob } from 'components/types/common';
import { Button, Theme } from '@mui/material';
import Image from 'next/image'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { useState } from 'react';
import { DrawerReservation } from '../reservationDetail/drawer';
import { makeStyles } from '@material-ui/core/styles';
import { getItemDetails } from 'components/utils/api';

export interface ITableData {
  jobs: TJob[]
}

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
});


export default function TableData({ jobs }: ITableData) {

  const [hoveredRowIndex, setHoveredRowIndex] = useState('');
  const [showDrawer, setShowDrawer] = useState(false)
  const [jobInfo, setJobInfor] = useState<TJob>()
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

  const handleRowClick = async (job: TJob) => {
    const res = await getItemDetails(job?.id)
    console.log('res', res)
    setJobInfor(job)
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
                  onMouseEnter={() => handleRowOver(job?.id)}
                  onMouseLeave={() => handleRowLeave()}
                  className="bg-gray-100 mb-4"
                  onClick={() => handleRowClick(job)}
                  key={job?.id}
                  sx={{
                    '& td, & th': {
                      borderTop: "1px solid #ccc",
                      borderBottom: "1px solid #ccc"
                    },
                    'th': { borderLeft: "1px solid #ccc" },
                    ' &:not(:last-child)': { marginBottom: '4px' },
                    backgroundColor: job?.id === hoveredRowIndex ? '#00FFB0' : 'transparent',
                    cursor: hoveredRowIndex ? 'pointer' : null,
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <TableCell component="th" scope="row" align='left' className="px-3" >
                    <div className='flex items-center gap-x-4 '>
                      <Image src='/work.svg' alt='image' width={100} height={62} className='md:w-[60px] md:h-[42px] lg:w-[100px] lg:h-[62px]' />
                      <p className='font-bold text-overflow-threeline-ellipsis'>{job.title}</p>
                    </div>
                  </TableCell>
                  <TableCell align='left' className="px-3" >

                    <p className='font-sans font-bold'>
                      {job?.name}
                    </p>

                  </TableCell>
                  <TableCell align="left" className="px-3"  >
                    <p className='font-sans font-bold'>{job?.position}</p>

                  </TableCell>
                  <TableCell align="left" className="px-3"  >
                    <p className='font-sans font-bold'>
                      {job?.day}
                    </p>

                  </TableCell>
                  <TableCell align="left" sx={{ borderRight: "1px solid #ccc" }} className="px-3" >
                    <div className='flex flex-wrap gap-4'>
                      {job?.time.map((d, index) => (
                        <Button key={index}
                          disabled={!d.isFull}
                          className={`rounded-[12.5px] py-[2px] px-[15px] border border-solid border-[#000000] font-bold ${d.isFull ? 'bg-secondMainColor hover:bg-secondMainColor text-[#000000]' : ' !text-[#fff] bg-gray hover:bg-gray '}`}
                        >
                          <p className=" font-bold font-sans text-sm">
                            {d.time}
                          </p>
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer >

      <DrawerReservation open={showDrawer} onClose={toggleDrawer} jobInfo={jobInfo} />
    </>
  );
}