import { Box, Button, Divider, Grid, Modal } from "@mui/material";
import { TJob } from "components/types/common";
import Image from "next/image";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '49.5%',
  transform: 'translate(-50%, -50%)',
  width: 1248,
  bgcolor: '#FFFFFF',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,

};

export interface IChildModel {
  open: boolean;
  handleClose: () => void;
  jobDetail: TJob;

}

const ChildModel = ({ open, handleClose, jobDetail }: IChildModel) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <>
        <div className="modal-body">
          <Box sx={{ ...style, width: 1248, borderRadius: '20px' }}>
            {/* <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description">
              {
                jobDetail?.name
              }            </p> */}

            <Grid container spacing={2} style={{ padding: '40px' }}>
              <Grid item xs={7}>
                <div className="flex flex-col gap-y-4">

                  <Image alt="image" width={609} height={312} src='/working.jpg' className="rounded-[20px]" />
                  <div className="font-bold">
                    <p className="text-2xl ">{jobDetail?.title}</p>
                    <p className="text-2xl">{jobDetail?.name}</p>
                    <p className="text-lg py-4 ">{jobDetail?.position}</p>
                  </div>

                  <div>
                    <p className="text-sm">
                      スタートアップのプロダクト開発に興味がある方、お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                      お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                      お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                      お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                      お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                      お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                      お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                      お話ししましょう！スタートアップのプロダクト開発に興味がある方、
                      お話ししましょう！
                    </p>
                  </div>
                </div>


              </Grid>
              <Divider orientation="vertical" flexItem />

              <Grid item xs={4}>
                <p className="font-bold text-lg ">Reverse</p>

                <div className="flex items-center font-bold py-8">
                  <EventAvailableIcon />
                  <p>{jobDetail?.day}</p>
                </div>

                <div className="mt-[40px]">
                  <p className="font-bold text-sm">予約したい時間帯をクリックしてください。</p>
                  <div className="flex flex-col gap-[15px] mt-[26px]">

                    {jobDetail?.time.map((t, index) => (
                      <Button key={index}
                        className={`h-10 w-96 rounded-[50px] text-[#fff] font-bold ${t.isFull ? 'bg-[#BA00FF]' : 'bg-[#F4D8FF]'}`}
                      >
                        <p className="text-lg font-bold">

                          {t.time}
                        </p>
                      </Button>
                    ))}
                  </div>
                </div>
              </Grid>
            </Grid>
            <Button onClick={handleClose} className="absolute top-0 right-0">
              <CloseIcon className="text-[#000000]" />
            </Button>
          </Box>

        </div></>
    </Modal>
  )
}

export default ChildModel