'use client'

import { Button, Grid, Pagination } from "@mui/material"
import TableData from "components/components/table"
import { TJob } from "components/types/common"
import PostAddIcon from '@mui/icons-material/PostAdd';
import { makeStyles } from '@material-ui/core/styles';
import { jobs } from "../../utils/db";
import NoRegister from "components/components/reservationRegistration/noRegister";
import AddNewForm from "components/components/administratorRegistration/addNewAgenda";
import AddIcon from '@mui/icons-material/Add';
import AdminMenus from "components/components/layout/adminMenus";
import { useState } from "react";
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
  const [isAddRegistration, setIsAddRegistration] = useState(false)
  const [isListPage, setIsListPage] = useState(true)
  return (
    <>
      <div className={`hidden sm:block pl-[527px] ${isAddRegistration ? 'sm:hidden' : ''}`}>
        <p className="font-bold text-lg ">ホスト一覧</p>
      </div>
      <Grid container spacing={0} className='relative flex justify-center'>
        <Grid item xs={4}
          className='hidden sm:block'
          style={{ maxWidth: '280px', background: '#F8F9FA', border: '1px solid #E1E1E1' }}>
          <div className="px-4 w-full pt-20">

            <Button
              onClick={() => {
                setIsAddRegistration(true);
                setIsListPage(false)
              }}
              className="w-full bg-[#ba00ff] text-[#fff] rounded-[50px] 
              flex justify-start gap-2 items-center hover:bg-[#BA00FF]
              py-[10px] pl-4">
              <PostAddIcon />
              <p className="font-sans">
                新規アジェンダ登録
              </p>
            </Button>
          </div>

        </Grid>
        <Grid item xs={12}
          className='max-w-[1448px] pt-6 border-t border-b border-[#E1E1E1] border-solid md:pl-10'
        >
          {isAddRegistration ? <>
            <AddNewForm setIsAddRegistration={setIsAddRegistration} />
          </>
            :
            <>
              {jobs ?
                <>
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
                </>
                : <NoRegister />
              }
            </>
          }
        </Grid>
        <div className={`absolute bg-[#ba00ff] rounded-full text-[#fff] p-5 right-[15px] bottom-[15px] sm:hidden ${isAddRegistration ? 'hidden' : 'block'}`}>
          <AddIcon />
        </div>
      </Grid>
      <AdminMenus isListPage={isListPage} />

    </>
  )
}

export default Administrator