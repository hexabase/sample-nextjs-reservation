'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
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
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'components/components/loader';
import { searchReservation } from 'components/utils/api';
import { getTimeJP } from 'components/utils/getDay';

export default function Home() {
  const [searchRequest, setSearchRequest] = useState<string>();
  const [dateRequest, setDateRequest] = useState<string>();
  const [reservationList, setReservationList] = useState<TReservationRespond[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState<number>(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const title = searchParams.get('title');
    const date = searchParams.get('date');
    title && setSearchRequest(title);
    date && setDateRequest(date);
  }, [searchParams]);

  const router = useRouter();
  const handleClearSearch = () => {
    setDateRequest('');
    router.push(`/?title=${searchRequest||''}&date=`);
  };

  const payloadReservation: TReservationSearchPayloadOption = useMemo(() => {
    const conditions: TReservationSearchCondition[] | any = [];
    let sort_field_id: string | undefined;
    let sort_order: 'asc' | 'desc' | undefined;

    if (searchRequest && !dateRequest) {
      conditions.push({
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
      });
    }
    if (dateRequest && !searchRequest) {
      const dateObj = new Date(dateRequest);
      const outputDateString = dateObj.toISOString().split('T')[0] + 'T00:00:00Z';
      conditions.push({
        id: 'date',
        search_value: [outputDateString],
      });
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
        if (res.data.items.length == 0) {
          setHasMore(false);
        }
      } catch (error) {
        throw error;
      }
    };
    getReservationData();
  }, [searchRequest, dateRequest]);

  useEffect(() => {
    const getReservationData = async () => {
      try {
        const res = await searchReservation({
          ...payloadReservation,
          page: page,
          per_page: 9,
          use_display_id: true,
          include_lookups: true,
        });
        setReservationList([...reservationList, ...res.data.items]);
        setTotalItems(res.data.totalItems);
        if (res.data.items.length == 0) {
          setHasMore(false);
        }
      } catch (error) {
        throw error;
      }
    };
    getReservationData();
  }, [page]);

  return (
    <div className='container-responsive'>
      <div className='flex flex-col gap-y-2 sm:gap-y-8'>
        {dateRequest && 
          <div className='sm:hidden'>
            <Button onClick={handleClearSearch} className='bg-[#f2f2f2] text-[#808080] rounded-[50px]  mb-2 mt-2'>
              <div className='flex items-center justify-between gap-x-4'>
                <p className='text-xs'>{getTimeJP(dateRequest)}</p>
                <CloseIcon className='h-4 w-4' />
              </div>
            </Button>
          </div>
        }

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
              date: '',
            }}
            onSubmit={(data) => {
              setSearchRequest(data.title);
              setDateRequest(data.date);
            }}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className='border border-[#BA00FF] absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-1/2 bg-white flex h-[60px] pl-[18px] items-center rounded bg-[#fff]'>
                  <div className='flex flex-row w-[490px]'>
                    <div className='w-1/2'>
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
                        }}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            fontWeight: 'bold',
                            fontSize: '12px',
                            color: '#000000',
                          },
                        }}
                      />
                    </div>
                    <div className='w-1/2'>
                      <TextField
                        id='date'
                        value={values.date}
                        label='日付を選択'
                        variant='standard'
                        margin='normal'
                        type='date'
                        defaultValue=''
                        placeholder='カレンダーから選ぶ'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                          style: {
                            fontWeight: 'bold',
                            fontSize: '12px',
                            color: '#000000',
                          },
                        }}
                      />
                    </div>
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

        
          <InfiniteScroll
              dataLength={reservationList.length || 0}
              next={() => setPage(page + 1)}
              hasMore={hasMore}
              loader={<Loader />}
            >
            <div className='mb-[52px]'>
              <Grid container spacing={10}>
                {reservationList[0] && reservationList.map((reservation) => (
                  <MediaCard key={reservation.i_id} reservation={reservation} />
                ))}
              </Grid>
            </div>
          </InfiniteScroll>

      </div>
      <div className='sm:hidden'>
        <FooterMobile />
      </div>
    </div>
  );
}
