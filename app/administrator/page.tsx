'use client'

import { Button, Grid, Pagination } from "@mui/material"
import TableData from "components/components/table"
import { TJob } from "components/types/common"
import PostAddIcon from '@mui/icons-material/PostAdd';
import { makeStyles } from '@material-ui/core/styles';
import { jobs } from "../../utils/db";
import NoRegister from "components/components/reservationRegistration/noRegister";
import AddNewForm from "components/components/administratorRegistration/addNewAgenda";
const useStyles = makeStyles({
  selected: {
    backgroundColor: '#2196f3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  },
  item: {
    color: '#2196f3',
    border: '1px solid #2196f3',
    '&:hover': {
      backgroundColor: '#2196f3',
      color: '#fff',
    },
  },
});

const Administrator = () => {
  const classes = useStyles();
  return (
    <>
      <div className="pl-[527px]">
        <p className="font-bold text-lg">ホスト一覧</p>
      </div>
      <Grid container spacing={0} className='flex justify-center'>
        <Grid item xs={4} style={{ maxWidth: '280px', background: '#F8F9FA', border: '1px solid #E1E1E1' }}>
          <div className="px-4 w-full pt-20">

            <Button className="w-full bg-[#ba00ff] text-[#fff] rounded-[50px] flex justify-start gap-2 items-center hover:bg-[#BA00FF]">
              <PostAddIcon />
              <p className="font-sans">

                新規登録
              </p>
            </Button>
          </div>

        </Grid>
        <Grid item xs={12} style={{ maxWidth: '1448px', paddingTop: '24px', paddingLeft: '48px', borderTop: '1px solid #E1E1E1', borderBottom: '1px solid #E1E1E1' }}>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              1件〜10件 / 全120件
            </p>
            <div>
              <Pagination count={10} />
            </div>
          </div>
          <TableData jobs={jobs} />

          <div className="flex justify-end mt-[18px] mb-[210px]">
            <Pagination count={10} />
          </div>

          {/* <NoRegister />
          <AddNewForm /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default Administrator