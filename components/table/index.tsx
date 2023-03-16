
import Paper from '@mui/material/Paper';
import { TFieldValueConvert, TJob, TReservationRespond } from 'components/types/common';
import { Button, Theme } from '@mui/material';
import Image from 'next/image'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { useEffect, useState } from 'react';
import { DrawerReservation } from '../reservationDetail/drawer';
import { makeStyles } from '@material-ui/core/styles';
import { getFile, getItemDetails } from 'components/utils/api';
import ReservationRow from '../reservationDetail/reservationRow';

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
  console.log('hob', jobs)
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
                <ReservationRow
                  job={job}
                  handleRowLeave={handleRowLeave}
                  handleRowOver={handleRowOver}
                  handleRowClick={handleRowClick}
                  hoveredRowIndex={hoveredRowIndex}
                />
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer >

      <DrawerReservation open={showDrawer} onClose={toggleDrawer} reservationInfo={reservationInfo} />
    </>
  );
}