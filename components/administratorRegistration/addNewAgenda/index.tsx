'use client'

import { Grid, TextField } from "@mui/material"
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { useRef, useState } from "react";
import Image from "next/image";

export interface IAddNewForm {
  setIsAddRegistration: any
}
const AddNewForm = ({ setIsAddRegistration }: IAddNewForm) => {
  const fileInput = useRef<HTMLInputElement>(null);

  function handleClick() {
    event?.stopPropagation();
    fileInput.current?.click();
  }
  const [checked, setChecked] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
  });
  const handleChange = (event: any) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };
  return (
    <div className="px-5 md:px-0 pt-[60px] md:pt-0 pb-12 md:pb-0">
      <p className="font-bold text-lg text-center sm:text-left mb-4">新規アジェンダ登録</p>
      <Grid container className="flex-wrap md:flex-nowrap gap-10">
        <Grid item xs={12} md={7}>
          <p className="mb-8 pl-3 md:pl-0 text-sm md:text-base">必要事項を入力して「登録」ボタンをクリックしてください</p>

          <div className="flex flex-col gap-10">

            <TextField
              id="outlined-controlled"
              placeholder='カレンダーから選択'
              label="日程*"
              InputLabelProps={{ shrink: true }}
              style={{ width: '100%', }}
            />

            <TextField
              id="outlined-controlled"
              placeholder='スタートアップのプロダクト開発に興味がある方、お話ししましょう！'
              label="タイトル*"
              InputLabelProps={{ shrink: true }}
              style={{ width: '100%', }}
            />
            <TextField
              id="outlined-controlled"
              placeholder='このアジェンダの概要を記載してください。'
              label="予約概要*"
              InputLabelProps={{ shrink: true }}
              style={{ width: '100%', }}
              multiline
              rows={13}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={5}>
          <div
            onClick={handleClick}
            className="bg-[#F2F2F2] w-full h-[330px] flex flex-col items-center justify-center gap-[10px] mb-8">
            <label htmlFor="file-input">
              <Image src='/camera.svg' alt="camera" width={40} height={36} />
            </label>
            <input id="file-input" type="file" ref={fileInput}
              style={{ display: 'none' }}
            />
            <button
              className="bg-[#fff] text-[#808080] px-[10px] py-[6px] 
            border border-solid border-[#808080] rounded-[4px] text-[10px] font-bold">
              <p>画像をアップロード</p>
            </button>
          </div>
          <p className="text-base mb-2">時間の設定</p>
          <div
            className='flex flex-wrap gap-x-[30px] md:gap-x-[45px]'
          >
            <FormControlLabel
              control={<Checkbox
                color="primary"
                checked={checked.checkbox1} onChange={handleChange} name="checkbox1" />}
              label="10.00"
            />
            <FormControlLabel

              control={<Checkbox
                color="primary"
                checked={checked.checkbox2} onChange={handleChange} name="checkbox2" />}
              label="11.00"
            />
            <FormControlLabel

              control={<Checkbox
                color="primary"
                checked={checked.checkbox3} onChange={handleChange} name="checkbox3" />}
              label="12.00"
            />
            <FormControlLabel

              control={<Checkbox
                color="primary"
                checked={checked.checkbox4} onChange={handleChange} name="checkbox4" />}
              label="13.00"
            />
            <FormControlLabel
              control={<Checkbox
                color="primary"
                checked={checked.checkbox5} onChange={handleChange} name="checkbox5" />}
              label="14.00"
            />
            <FormControlLabel
              control={<Checkbox
                color="primary"
                checked={checked.checkbox6} onChange={handleChange} name="checkbox6" />}
              label="15.00"
            />
            <FormControlLabel
              control={<Checkbox
                color="primary"
                checked={checked.checkbox7} onChange={handleChange} name="checkbox7" />}
              label="16.00"
            />
            <FormControlLabel
              control={<Checkbox
                color="primary"
                checked={checked.checkbox8} onChange={handleChange} name="checkbox8" />}
              label="17.00"
            />

          </div>
        </Grid>
      </Grid>

      <div className="flex flex-col items-center mt-14 sm:mb-10">
        <p>上記内容でよろしければ登録ボタンをクリックしてアジェンダを作成してください</p>
        <button
          onClick={() => setIsAddRegistration(false)}
          className="max-w-[381px] w-full bg-[#BA00FF] rounded-[4px] py-2 px-8 text-[#fff] mt-4 hover:bg-[#ba00ff]/[0.6]">
          <p>登録</p>
        </button>
      </div>
    </div>
  )
}

export default AddNewForm