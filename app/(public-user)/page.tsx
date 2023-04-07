'use client';

import Image from 'next/image';
import { Inter } from '@next/font/google';
import { Button, Grid, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import MediaCard from 'components/components/card';
import { FooterMobile } from 'components/components/footerMobile';
import CloseIcon from '@mui/icons-material/Close';
import {
  TReservationRespond,
  TReservationSearchCondition,
  TReservationSearchPayloadOption,
} from 'components/types/common';
import { useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { searchReservation } from 'components/utils/api';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [searchRequest, setSearchRequest] = useState<string>();
  const [dateRequest, setDateRequest] = useState();
  const [reservationList, setReservationList] = useState<TReservationRespond[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const payloadReservation: TReservationSearchPayloadOption = useMemo(() => {
    const conditions: TReservationSearchCondition[] | any = [];
    let sort_field_id: string | undefined;
    let sort_order: 'asc' | 'desc' | undefined;
    let use_or_condition = false;

    if (searchRequest && !dateRequest) {
      conditions.push(
        {
          id: 'title',
          search_value: [searchRequest],
        },
        {
          id: 'reservation_detail',
          search_value: [searchRequest],
        },
      );
      use_or_condition = true;
    }
    if (dateRequest && !searchRequest) {
      const dateObj = new Date(dateRequest);
      const outputDateString = dateObj.toISOString().split('T')[0] + 'T00:00:00Z';
      conditions.push({
        id: 'date',
        search_value: [outputDateString],
      });
      use_or_condition = true;
    }

    if (searchRequest && dateRequest) {
      const dateObj = new Date(dateRequest);
      const outputDateString = dateObj.toISOString().split('T')[0] + 'T00:00:00Z';
      conditions.push(
        {
          conditions: [
            {
              id: 'title',
              search_value: [searchRequest],
            },
            {
              id: 'reservation_detail',
              search_value: [searchRequest],
            },
          ],
          use_or_condition: true,
        },
        {
          conditions: [
            {
              id: 'date',
              search_value: [outputDateString],
            },
          ],
        },
      );
    }
    if (conditions.length === 0) {
      (sort_field_id = 'date'), (sort_order = 'desc');
    }
    return {
      conditions,
      sort_field_id,
      sort_order,
      use_or_condition,
    };
  }, [searchRequest, dateRequest]);

  useEffect(() => {
    const getReservationData = async () => {
      try {
        const res = await searchReservation({
          ...payloadReservation,
          page: 1,
          per_page: 9,
          use_display_id: true,
          include_lookups: true,
        });
        setReservationList(res.data.items);
        setTotalItems(res.data.totalItems);
      } catch (error) {
        throw error;
      }
    };
    getReservationData();
  }, [payloadReservation, searchRequest, dateRequest]);

  return (
    <div className='container-responsive'>
      <div className='flex flex-col gap-y-2 sm:gap-y-8'>
        <div className='sm:hidden'>
          <Button className='bg-[#f2f2f2] text-[#808080] rounded-[50px]  mb-2 mt-2'>
            <div className='flex items-center justify-between gap-x-4'>
              <p className='text-xs'>1月10日(火)</p>
              <CloseIcon className='h-4 w-4' />
            </div>
          </Button>
        </div>

        <div className='hidden sm:block sm:mt-8 sm:relative'>
          <Image
            alt='lunchpal'
            src='/lunchpalmain.png'
            width={1248}
            height={200}
            className='rounded-[20px] opacity-70'
          />

          <Formik
            initialValues={{
              title: '',
              date: undefined,
            }}
            onSubmit={(data) => {
              setSearchRequest(data.title);
              setDateRequest(data.date);
            }}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className='border border-[#BA00FF] absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-1/2 bg-white flex h-[60px] pl-[18px] items-center rounded bg-[#fff]'>
                  <div>
                    <TextField
                      id='title'
                      label='キーワードで探す'
                      value={values.title}
                      variant='standard'
                      margin='normal'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='人物・キーワード'
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontFamily: 'Noto Sans JP, sans-serif',
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          fontWeight: 'bold',
                          fontSize: '12px',
                          color: '#000000',
                          fontFamily: 'Noto Sans JP, sans-serif',
                        },
                      }}
                    />
                    <TextField
                      id='date'
                      value={values.date}
                      label='日付を選択'
                      variant='standard'
                      margin='normal'
                      type='datetime-local'
                      required
                      defaultValue=''
                      placeholder='カレンダーから選ぶ'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontFamily: 'Noto Sans JP, sans-serif',
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          fontWeight: 'bold',
                          fontSize: '12px',
                          color: '#000000',
                          fontFamily: 'Noto Sans JP, sans-serif',
                        },
                      }}
                    />
                  </div>

                  <Button type='submit' className='bg-[#ba00ff] h-[60px] '>
                    <SearchOutlined className='text-[#fff]' />
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>

        <div className='sm:mt-[18px] flex gap-x-4'>
          <p className='font-bold text-sm'>検索結果</p>
          <p className='font-bold text-sm'>{totalItems}件</p>
        </div>

        <div className='mb-[52px]'>
          <Grid container spacing={10}>
            {reservationList.map((reservation) => (
              <MediaCard key={reservation.i_id} reservation={reservation} />
            ))}
          </Grid>
        </div>
      </div>
      <div className='sm:hidden'>
        <FooterMobile />
      </div>
    </div>
  );
}
