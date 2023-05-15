import { useRouter } from 'next/navigation';
import { SearchOutlined } from '@mui/icons-material';
import { Button, Drawer, TextField } from '@mui/material';
import { Formik } from 'formik';

export interface ISearchArea {
  isSearchOpen: boolean;
  onClose: () => void;
}

const SearchArea = ({ isSearchOpen, onClose }: ISearchArea) => {
  const router = useRouter();

  return (
    <>
      <Drawer
        open={isSearchOpen}
        onClose={onClose}
        PaperProps={{
          className: 'h-full',
        }}
        anchor='bottom'
      >
        <div className='py-[120px] px-5 flex flex-col gap-5 '>
          <div className='flex justify-center items-center p-[10px] gap-[10px]'>
            <p className='font-bold'>条件を指定して検索</p>
          </div>
          <Formik
            initialValues={{
              title: '',
              date: '',
            }}
            onSubmit={(data) => {
              onClose();
              router.push(`/?title=${data.title}&date=${data.date}`);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  name='title'
                  label='キーワードで探す'
                  margin='normal'
                  className='w-full border-mainColor'
                  placeholder='人物・キーワード'
                  value={values.title}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontWeight: 'bold',
                      fontSize: '12px',
                      color: '#000000',
                    },
                  }}
                />
                <TextField
                  id='date'
                  label='日付を選択'
                  margin='normal'
                  placeholder='カレンダーから選ぶ'
                  className='w-full mb-10'
                  type='date'
                  value={values.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontWeight: 'bold',
                      fontSize: '12px',
                      color: '#000000',
                    },
                  }}
                />

                <Button
                  type='submit'
                  className='relative w-full bg-[#ba00ff] h-[60px] rounded-[4px] py-2 px-[18px] text-lg text-[#fff]'
                >
                  <p>検索</p>
                  <SearchOutlined className='absolute text-[#fff] right-4' />
                </Button>
              </form>
            )}
          </Formik>

          <div className='flex justify-center items-center p-[10px] gap-[10px]' onClick={onClose}>
            <p>キャンセル</p>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SearchArea;
