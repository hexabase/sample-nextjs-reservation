import { SearchOutlined } from "@mui/icons-material";
import { Button, Drawer, TextField } from "@mui/material";

export interface ISearchArea {
  isSearchOpen: boolean,
  onClose: () => void,
};

const SearchArea = ({ isSearchOpen, onClose }: ISearchArea) => {
  return (
    <div>
      <Drawer
        open={isSearchOpen}
        onClose={onClose}
        PaperProps={{
          className: 'h-full'
        }}
        anchor="bottom">
        <div className="py-[120px] px-5 flex flex-col gap-5 ">
          <div className="flex justify-center items-center p-[10px] gap-[10px]">
            <p className="font-bold">条件を指定して検索</p>
          </div>
          <div>
            <TextField id="outlined-basic" label="キーワードで探す" margin="normal"
              className="w-full border-mainColor"
              placeholder='人物・キーワード' InputProps={{
                disableUnderline: true, style: {
                  fontFamily: 'Noto Sans JP, sans-serif',
                },
              }}
              InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold', fontSize: '12px', color: '#000000',
                  fontFamily: 'Noto Sans JP, sans-serif',
                }
              }} />
            <TextField id="outlined-basic" label="日付を選択"
              margin='normal'
              placeholder='カレンダーから選ぶ'
              className="w-full"
              InputProps={{
                disableUnderline: true, style: {
                  fontFamily: 'Noto Sans JP, sans-serif',
                },
              }} InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold', fontSize: '12px', color: '#000000',
                  fontFamily: 'Noto Sans JP, sans-serif',
                }
              }} />

          </div>
          <Button className='relative bg-[#ba00ff] h-[60px] rounded-[4px] py-2 px-[18px] 
          flex justify-center items-center gap-[10px] text-lg text-[#fff]'>
            <p>検索</p>
            <SearchOutlined className='absolute text-[#fff] right-4' />
          </Button>

          <div
            className="flex justify-center items-center p-[10px] gap-[10px]"
            onClick={onClose}>
            <p>キャンセル</p>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default SearchArea;