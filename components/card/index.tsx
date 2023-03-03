import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { TimeBooking, TJob } from 'components/types/common';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Modal } from '@material-ui/core';
import ChildModel from '../modal';
import ReservationDrawer from '../reservationDetail/reservationDrawer';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export interface ICardJob {
  jobs: TJob[]
}


export default function MediaCard({ jobs }: ICardJob) {
  const [open, setOpen] = useState(false);
  const [jobDetail, setJobDetail] = useState<TJob>();
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const handleOpen = (job: TJob) => {
    setOpen(true);
    setJobDetail(job);
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

  return (
    <>
      <Grid container spacing={10}>

        {jobs.map((job) => {
          return (
            <Grid item xs={12} md={4} key={job.id}>
              <Card onClick={() => handleOpen(job)} sx={{ maxWidth: 363, borderRadius: '20px', height: 394, cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.04)' }}  >
                <CardMedia
                  sx={{ height: 226, width: 363, borderRadius: '20px' }}
                  image="/work.svg"
                  title="green iguana"
                  className='relative rounded-[20px] bg-black-rgba bg-blend-darken	'
                >
                  <div className='absolute top-3 left-3 text-xs font-bold text-[#fff] flex items-center gap-x-1'>
                    <EventAvailableIcon />
                    <p>{job.day}</p>
                  </div>
                  <div className='absolute left-3 bottom-3 flex flex-col text-[#fff] text-base font-bold'>
                    <p>{job.name}</p>
                    <p className='text-xs'>{job.position}</p>
                  </div>
                  {job.isAvailable ? <div className='absolute top-3 right-8 sm:right-3'>
                    <Button sx={{ "&:hover": { backgroundColor: "#3DE7AE", }, fontFamily: 'Noto Sans JP, sans-serif' }} className='bg-[#3DE7AE] text-[#fff] rounded-[50px]'>
                      <p className='font-bold text-xs'>予約可</p>
                    </Button>
                  </div> :
                    <div className='absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-1/2 text-[#fff] '>
                      <p className='font-bold text-xl'>FULL</p>
                    </div>
                  }

                </ CardMedia>
                <CardContent className='pl-5 pr-6'>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                    <p className='font-bold text-sm text-overflow-multiline-ellipsis h-10 '>{job.title}</p>
                  </Typography>
                  <div className='flex gap-[10px] flex-wrap mt-5 sm:mt-4'>
                    {job.time.map((t: TimeBooking, index) => (
                      <Button
                        sx={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                        key={index}
                        className={`h-6 rounded-[50px] text-[#fff] font-bold ${t.isFull ? 'bg-[#BA00FF] hover:bg-[#BA00FF]' : 'bg-[#F4D8FF] hover:bg-[#F4D8FF]'}`}
                      >{t.time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        })}

        {showModal &&
          <>
            <ChildModel handleClose={handleClose} open={showModal} jobDetail={jobDetail} />
          </>
        }

        {showDrawer &&
          <div className='pt-16'>
            <ReservationDrawer jobDetail={jobDetail} handleClose={handleClose} showDrawer={showDrawer} />
          </div>
        }
      </Grid>

    </>
  );
}