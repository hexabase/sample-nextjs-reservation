import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export default function MediaCard() {
  return (
    <>
      <Card sx={{ maxWidth: 363, borderRadius: '20px' }}  >
        <CardMedia
          sx={{ height: 226, width: 363, borderRadius: '20px' }}
          image="/working.jpg"
          title="green iguana"
          className='relative rounded-sm bg bg-black-rgba'
        >
          <div className='absolute top-3 left-3 text-xs font-bold text-[#fff] flex items-center gap-x-1'>
            <EventAvailableIcon />
            <p>1月10日(火)</p>
          </div>
          <div className='absolute left-3 bottom-3 flex flex-col text-[#fff] text-base font-bold'>
            <p>山田 太郎</p>
            <p className='text-xs'>CEO</p>
          </div>
          <div className='absolute top-3 right-3'>
            <Button className='bg-[#3DE7AE] text-[#fff] rounded-[50px]'>
              <p className='font-bold text-xs'>予約可</p>
            </Button>
          </div>
        </ CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <p className='font-bold text-sm'>スタートアップのプロダクト開発に興味がある方、お話ししましょう！</p>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>

      </Card>
    </>
  );
}