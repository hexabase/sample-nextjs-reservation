'use client'

import { Button, Grid, Pagination } from "@mui/material"
import TableData from "components/components/table"
import PostAddIcon from '@mui/icons-material/PostAdd';
import { makeStyles } from '@material-ui/core/styles';
import { jobs } from "../../../utils/db";
import NoRegister from "components/components/reservationRegistration/noRegister";
import AddNewForm from "components/components/administratorRegistration/addNewAgenda";
import AddIcon from '@mui/icons-material/Add';
import AdminMenus from "components/components/layout/adminMenus";
import { useCallback, useEffect, useState } from "react";
import CardMobile from "components/components/reservationDetail/cardMobile";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { getUserInfo, getRecruitersItems, getReservationsItems, } from "components/utils/api";
import { TReservationRespond } from "components/types/common";

const Administrator = () => {
  const [isAddRegistration, setIsAddRegistration] = useState(false)
  const [isListPage, setIsListPage] = useState(true)
  const [recuiterList, setRecruiterList] = useState<TReservationRespond[]>([])

  const getDataReservationItems = useCallback(
    async (id: string) => {
      try {
        console.log('id', id)
        const res = await getReservationsItems(id)
        console.log('data', res.data.items)
        setRecruiterList(res.data.items)
      } catch (error) {
        console.log(error)
      }
    }, []
  )
  const getDataRecruitersItems = useCallback(
    async (id: string) => {
      try {
        const res = await getRecruitersItems(id)
        console.log('resp', res)
        console.log('idid', res.data?.items[0]?.recruiter_id)
        getDataReservationItems(res.data?.items[0]?.recruiter_id)
      } catch (error) {
        console.log('error', error)
      }
    }, [getDataReservationItems])

  useEffect(() => {
    async function getDataUserInfo() {
      const res = await getUserInfo()
      console.log('userInfo', res)
      getDataRecruitersItems(res.data.u_id)
    }
    getDataUserInfo()

  }, [])

  return (
    <>
      <div className={`hidden sm:block md:pl-[127px] sm:py-[15px] lg:pl-[327px] ${isAddRegistration ? 'sm:hidden' : ''}`}>
        <p className="font-bold text-lg ">ホスト一覧</p>
      </div>
      <Grid container spacing={0} className='relative flex justify-center'>
        <Grid item xs={2}
          className='hidden sm:block w-2/12 bg-[#F8F9FA] border border-solid border-[#E1E1E1] h-screen'
        >
          <div className="flex flex-col items-center gap-[28px] px-4 w-full">
            <div className="flex py-[13px] gap-[13px] w-full justify-end">
              <KeyboardTabIcon />
            </div>
            <Button
              onClick={() => {
                setIsAddRegistration(true);
                setIsListPage(false)
              }}
              className="w-full bg-[#ba00ff] text-[#fff] rounded-[50px] 
              flex justify-start gap-2 items-center hover:bg-[#BA00FF]
              py-[10px] pl-4 pr-[4px] h-[37px]">
              <PostAddIcon />
              <p className="font-sans hidden lg:block h-full">
                新規アジェンダ登録
              </p>
            </Button>
          </div>

        </Grid>
        <Grid item xs={12} md={10}
          className='w-10/12 pt-6 border-t border-b border-[#E1E1E1] border-solid md:px-10'
        >
          {isAddRegistration ? <>
            <AddNewForm setIsAddRegistration={setIsAddRegistration} />
          </>
            :
            <>
              {recuiterList ?
                <>
                  <div className="hidden md:block">
                    <div className="flex items-center justify-between ">
                      <p className="text-sm">
                        1件〜10件 / 全120件
                      </p>
                      <div>
                        <Pagination count={10} />
                      </div>
                    </div>
                    <TableData jobs={recuiterList} />

                    <div className="flex justify-end mt-[18px] mb-[210px]">
                      <Pagination count={10} />
                    </div>
                  </div>

                  <div className="sm:hidden">
                    <CardMobile jobs={jobs} />
                  </div>
                </>
                : <NoRegister />
              }
            </>
          }
        </Grid>
        <div
          onClick={() => setIsAddRegistration(true)}
          className={`absolute bg-[#ba00ff] rounded-full text-[#fff] p-5 right-[15px] bottom-[15px] sm:hidden ${isAddRegistration ? 'hidden' : 'block'}`}>
          <AddIcon />
        </div>
      </Grid>
      <AdminMenus isListPage={isListPage} />

    </>
  )
}

export default Administrator