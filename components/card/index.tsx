import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { TReservationRespond } from 'components/types/common';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ChildModel from '../modal';
import ReservationDrawer from '../reservationDetail/reservationDrawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { getTimeJP } from 'components/utils/getDay';
import { getFile } from 'components/utils/api';
export interface ICardReservation {
  reservation: TReservationRespond;
}

export default function MediaCard({ reservation }: ICardReservation) {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageUrl, setImageUrl] = useState<string>();

  const handleOpen = () => {
    setOpen(true);

    if (isMobile) {
      setShowDrawer(true);
    } else {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setShowDrawer(false);
  };

  const reservable = (reservation: any) => {
    for (const i of [10, 11, 12, 13, 14, 15, 16, 17]) {
      if (reservation[`time_${i}`] == '1') return true;
    }
    return false;
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await getFile(reservation.image);
        const imageBytes = new Uint8Array(res.data);
        const blob = new Blob([imageBytes.buffer], { type: 'image' });
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } catch (error) {
        throw error;
      }
    };
    getImage();
  }, [reservation.i_id, reservation.image]);

  return (
    <>
      <Grid item xs={12} md={4} key={reservation.i_id}>
        <Card
          onClick={() => handleOpen()}
          sx={{
            maxWidth: 363,
            borderRadius: '20px',
            height: 394,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          }}
        >
          <CardMedia
            sx={{ height: 226, width: 363, borderRadius: '20px' }}
            image={`${imageUrl ? imageUrl : '/img-default.png'}`}
            className='relative rounded-[20px] bg-black-rgba bg-blend-darken'
          >
            <div className='absolute top-3 left-3 text-xs font-bold text-[#fff] flex items-center gap-x-1'>
              <EventAvailableIcon />
              <p>{getTimeJP(reservation.date)}</p>
            </div>
            <div className='absolute left-3 bottom-3 flex flex-col text-[#fff] text-base font-bold'>
              <p>{reservation.lookup_items?.recruiter.name}</p>
              <p className='text-xs'>{reservation.lookup_items?.recruiter.position}</p>
            </div>
            {reservable(reservation) ? (
              <div className='absolute top-3 right-8 sm:right-3'>
                <Button
                  sx={{
                    '&:hover': { backgroundColor: '#3DE7AE' },
                    fontFamily: 'Noto Sans JP, sans-serif',
                  }}
                  className='bg-[#3DE7AE] text-[#fff] rounded-[50px]'
                >
                  <p className='font-bold text-xs'>予約可</p>
                </Button>
              </div>
            ) : (
              <div className='absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-1/2 text-[#fff] '>
                <p className='font-bold text-xl'>FULL</p>
              </div>
            )}
          </CardMedia>
          <CardContent className='pl-5 pr-6'>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              <p className='font-bold text-sm text-overflow-multiline-ellipsis h-10 '>
                {reservation.title}
              </p>
            </Typography>
            <div className='flex justify-center gap-[10px] flex-wrap mt-5 sm:mt-4'>
              <Button
                sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                className={`h-6 rounded-[50px] text-[#fff] font-bold ${
                  reservation.time_10 == '1'
                    ? 'bg-[#BA00FF] hover:bg-[#BA00FF]'
                    : 'bg-[#F4D8FF] text-[#fff]'
                }`}
              >
                10.00
              </Button>

              <Button
                sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                className={`h-6 rounded-[50px] text-[#fff] font-bold ${
                  reservation.time_11 == '1'
                    ? 'bg-[#BA00FF] hover:bg-[#BA00FF]'
                    : 'bg-[#F4D8FF] text-[#fff]'
                }`}
              >
                11.00
              </Button>

              <Button
                sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                className={`h-6 rounded-[50px] text-[#fff] font-bold ${
                  reservation.time_12 == '1'
                    ? 'bg-[#BA00FF] hover:bg-[#BA00FF]'
                    : 'bg-[#F4D8FF] text-[#fff]'
                }`}
              >
                12.00
              </Button>

              <Button
                sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                className={`h-6 rounded-[50px] text-[#fff] font-bold ${
                  reservation.time_13 == '1'
                    ? 'bg-[#BA00FF] hover:bg-[#BA00FF]'
                    : 'bg-[#F4D8FF] text-[#fff]'
                }`}
              >
                13.00
              </Button>
              <Button
                sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                className={`h-6 rounded-[50px] text-[#fff] font-bold ${
                  reservation.time_14 == '1'
                    ? 'bg-[#BA00FF] hover:bg-[#BA00FF]'
                    : 'bg-[#F4D8FF] text-[#fff]'
                }`}
              >
                14.00
              </Button>
              <Button
                sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                className={`h-6 rounded-[50px] text-[#fff] font-bold ${
                  reservation.time_15 == '1'
                    ? 'bg-[#BA00FF] hover:bg-[#BA00FF]'
                    : 'bg-[#F4D8FF] text-[#fff]'
                }`}
              >
                15.00
              </Button>

              <Button
                sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                className={`h-6 rounded-[50px] text-[#fff] font-bold ${
                  reservation.time_16 == '1'
                    ? 'bg-[#BA00FF] hover:bg-[#BA00FF]'
                    : 'bg-[#F4D8FF] text-[#fff]'
                }`}
              >
                16.00
              </Button>

              <Button
                sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                className={`h-6 rounded-[50px] text-[#fff] font-bold ${
                  reservation.time_17 == '1'
                    ? 'bg-[#BA00FF] hover:bg-[#BA00FF]'
                    : 'bg-[#F4D8FF] text-[#fff]'
                }`}
              >
                17.00
              </Button>
            </div>
          </CardContent>
        </Card>

        {showModal && (
          <>
            <ChildModel
              handleClose={handleClose}
              open={showModal}
              reservationDetail={reservation}
              imageUrl={imageUrl}
            />
          </>
        )}

        {showDrawer && (
          <div className='pt-16'>
            <ReservationDrawer
              reservationDetail={reservation}
              handleClose={handleClose}
              showDrawer={showDrawer}
              itemId={reservation.i_id}
              imageUrl={imageUrl}
            />
          </div>
        )}
      </Grid>
    </>
  );
}
