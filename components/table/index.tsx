
import Paper from '@mui/material/Paper';
import { TJob } from 'components/types/common';
import { Button, Theme } from '@mui/material';
import Image from 'next/image'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
export interface ITableData {
  jobs: TJob[]
}
export default function TableData({ jobs }: ITableData) {

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'unset' }}>
      <Table sx={{ minWidth: 650, }} aria-label="simple table" className='border-separate border-spacing-y-6'>
        <TableHead>
          <TableRow
            className='bg-[#BA00ff]'
          >
            <TableCell style={{ width: '30%' }} className='text-[#fff] font-sans' align='center'>
              <div className='flex items-center gap-1'>
                <p>

                  タイトル
                </p>
                <UnfoldLessIcon fontSize='small' />
              </div>
            </TableCell>

            <TableCell style={{ width: '10%' }} className='text-[#fff] font-sans' align='center'>
              <div className='flex items-center gap-1'>
                <p>

                  名前
                </p>
                <UnfoldLessIcon fontSize='small' />
              </div>
            </TableCell>
            <TableCell style={{ width: '20%' }} className='text-[#fff] font-sans' align="left">
              <div className='flex items-center gap-1'>
                <p>

                  肩書き
                </p>
                <UnfoldLessIcon fontSize='small' />
              </div>
            </TableCell>
            <TableCell style={{ width: '10%' }} className='text-[#fff] font-sans' align="left">
              <div className='flex items-center gap-1'>
                <p>

                  日程
                </p>
                <UnfoldLessIcon fontSize='small' />
              </div>
            </TableCell>
            <TableCell style={{ width: '40%' }} className='text-[#fff] font-sans' align="left">
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
                className="bg-gray-100 mb-4"
                key={job?.id}
                sx={{ '& td, & th': { borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc" }, 'th': { borderLeft: "1px solid #ccc" }, ' &:not(:last-child)': { marginBottom: '4px' } }}
              >
                <TableCell component="th" scope="row" align='left'  >
                  <div className='flex items-center gap-x-5 '>
                    <Image src='/work.png' alt='image' width={100} height={62} />
                    <p className='font-bold'>{job.title}</p>
                  </div>
                </TableCell>
                <TableCell align='left' >

                  <p className='font-sans font-bold'>

                    {job?.name}
                  </p>

                </TableCell>
                <TableCell align="left" style={{ flex: 1 }}  >
                  <p className='font-sans font-bold'>{job?.position}</p>

                </TableCell>
                <TableCell align="left"  >
                  <p className='font-sans font-bold'>
                    {job?.day}
                  </p>

                </TableCell>
                <TableCell align="left" sx={{ borderRight: "1px solid #ccc" }} >
                  <div className='flex flex-wrap gap-4'>
                    {job?.time.map((d, index) => (
                      <Button key={index}
                        disabled={!d.isFull}
                        className={`rounded-[12.5px] py-[2px] px-[15px] text-[#fff] font-bold ${d.isFull ? 'bg-[#BA00FF] hover:bg-[#BA00FF]' : 'bg-[#F4D8FF] hover:bg-[#BA00FF]'}`}
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
  );
}