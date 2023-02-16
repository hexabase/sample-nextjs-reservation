import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TJob } from 'components/types/common';
import { Button } from '@mui/material';
import Image from 'next/image'
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export interface ITableData {
  jobs: TJob[]
}
export default function TableData({ jobs }: ITableData) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            className='bg-[#BA00ff]'
          >
            <TableCell className='text-[#fff] font-sans'>名前</TableCell>
            <TableCell className='text-[#fff] font-sans' align="left">肩書き</TableCell>
            <TableCell className='text-[#fff] font-sans' align="left">日程</TableCell>
            <TableCell className='text-[#fff] font-sans' align="left">時間</TableCell>
            <TableCell className='text-[#fff] font-sans' align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs && jobs.map((job) => (
            <TableRow

              key={job?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className='flex items-center justify-between'>
                  <Image src='/work.png' alt='image' width={100} height={62} />


                  <p className='font-sans'>

                    {job?.name}
                  </p>
                </div>
              </TableCell>
              <TableCell align="left">
                <p className='font-sans'>{job?.position}</p>

              </TableCell>
              <TableCell align="left">
                <p className='font-sans'>
                  {job?.day}
                </p>

              </TableCell>
              <TableCell align="left">
                <div>
                  {job?.time.map((d) => (
                    <Button className='bg-[#BA00FF] text-[#fff] rounded-[50px]'>
                      <p className='font-sans'>

                        {d.time}
                      </p>
                    </Button>
                  ))}
                </div>
              </TableCell>
              <TableCell align="left">
                <div className='font-sans'>
                  {job?.isAvailable ? <Button className='bg-[#00ffb0] text-[#fff] rounded-[10px]'>
                    <p className='font-sans'>

                      詳細
                    </p>
                  </Button> : null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}