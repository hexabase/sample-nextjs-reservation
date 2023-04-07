'use client';

import { useMemo } from 'react';
import { Button, Grid, Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TableData from 'components/components/table';
import PostAddIcon from '@mui/icons-material/PostAdd';
import NoRegister from 'components/components/reservationRegistration/noRegister';
import AddNewForm from 'components/components/administratorRegistration/addNewAgenda';
import AddIcon from '@mui/icons-material/Add';
import AdminMenus from 'components/components/layout/adminMenus';
import { useRecruiterContext } from '../../../context';
import { useCallback, useEffect, useState } from 'react';
import CardMobile from 'components/components/reservationDetail/cardMobile';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { getReservationsItems } from 'components/utils/api';
import { TReservationRespond } from 'components/types/common';

const Administrator = () => {
  const { recruiter } = useRecruiterContext();
  const [registerable, setRegisterable] = useState(false);
  const [listPage, setListPage] = useState(true);
  const [reservationList, setReservationList] = useState<TReservationRespond[]>([]);
  const perPage = 10;
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => {
    if (totalItems % perPage === 0) {
      return totalItems / perPage;
    }
    return Math.round(totalItems / perPage + 0.5);
  }, [totalItems]);
  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#BA00FF',
      },
    },
  });

  const getDataReservationItems = useCallback(
    async (i_id: string) => {
      try {
        const res = await getReservationsItems(i_id, currentPage);
        setReservationList(res.data.items);
        setTotalItems(res.data.totalItems);
      } catch (error) {}
    },
    [currentPage],
  );

  useEffect(() => {
    if (recruiter && recruiter.i_id) {
      getDataReservationItems(recruiter.i_id);
    }
  }, [recruiter, getDataReservationItems, currentPage]);

  return (
    <>
      <div
        className={`hidden sm:block md:pl-[127px] sm:py-[15px] lg:pl-[327px] ${
          registerable ? 'sm:hidden' : ''
        }`}
      >
        <p className='font-bold text-lg '>アジェンダ一覧</p>
      </div>
      <Grid container spacing={0} className='relative flex justify-center'>
        <Grid
          item
          xs={2}
          className='hidden sm:block w-2/12 bg-[#F8F9FA] border border-solid border-[#E1E1E1] h-screen'
        >
          <div className='flex flex-col items-center gap-[28px] px-4 w-full'>
            <div className='flex py-[13px] gap-[13px] w-full justify-end'>
              <KeyboardTabIcon
                className='transform rotate-180 cursor-pointer'
                onClick={() => {
                  setRegisterable(false);
                  setListPage(true);
                }}
              />
            </div>
            <Button
              onClick={() => {
                setRegisterable(true);
                setListPage(false);
              }}
              className='w-full bg-[#ba00ff] text-[#fff] rounded-[50px] 
              flex justify-start gap-2 items-center hover:bg-[#BA00FF]
              pl-4 pr-[4px] h-[37px]'
            >
              <PostAddIcon />
              <p className='font-sans hidden lg:block h-[8px] leading-[8px]'>新規登録</p>
            </Button>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          className='w-10/12 pt-6 border-t border-b border-[#E1E1E1] border-solid md:px-10'
        >
          {registerable ? (
            <>
              <AddNewForm setRegisterable={setRegisterable} />
            </>
          ) : (
            <>
              {totalItems > 0 ? (
                <>
                  <div className='hidden md:block'>
                    <div className='flex items-center justify-between '>
                      <p className='text-sm'>
                        {perPage * (currentPage - 1) + 1}件〜{perPage * currentPage}件 / 全
                        {totalItems}件
                      </p>
                      <ThemeProvider theme={theme}>
                        <Pagination
                          page={currentPage}
                          count={totalPages}
                          color='primary'
                          onChange={handlePageChange}
                        />
                      </ThemeProvider>
                    </div>

                    <TableData reservationList={reservationList} />

                    <div className='flex justify-end mt-[18px] mb-[210px]'>
                      <ThemeProvider theme={theme}>
                        <Pagination page={currentPage} count={totalPages} color='primary' />
                      </ThemeProvider>
                    </div>
                  </div>

                  <div className='sm:hidden'>
                    <div className='px-5 py-[10px] gap-[7px] border-b border-b-[#E1E1E1]'>
                      <p className='text-sm font-bold '>アジェンダ一覧</p>
                    </div>

                    <div className='px-5 py-[10px] gap-[7px] border-b-[#E1E1E1] flex justify-end'>
                      <p>全{totalItems}件</p>
                    </div>

                    <div className='pt-10 pb-24 px-5 bg-[#F2F2F2] gap-4 flex flex-col items-center'>
                      {reservationList.map((reservation) => (
                        <CardMobile key={reservation.i_id} reservation={reservation} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <NoRegister setRegisterable={setRegisterable} />
              )}
            </>
          )}
        </Grid>
        <div
          onClick={() => setRegisterable(true)}
          className={`absolute bg-[#ba00ff] rounded-full text-[#fff] p-5 right-[15px] bottom-[15px] sm:hidden ${
            registerable ? 'hidden' : 'block'
          }`}
        >
          <AddIcon />
        </div>
      </Grid>
      <AdminMenus listPage={listPage} />
    </>
  );
};

export default Administrator;
