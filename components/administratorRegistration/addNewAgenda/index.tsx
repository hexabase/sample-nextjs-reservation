'use client'

import { Grid, TextField } from "@mui/material"
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { useState } from "react";

const AddNewForm = () => {
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
    <div>
      <Grid container>
        <Grid item xs={7}>
          <p className="mb-8 pl-3">必要事項を入力して「登録」ボタンをクリックしてください</p>

          <div className="flex flex-col gap-10">

            <TextField
              id="outlined-controlled"
              placeholder='カレンダーから選択'
              label="日程*"
              InputLabelProps={{ shrink: true }}
              style={{ width: '100%', padding: '0 10px' }}
            />

            <TextField
              id="outlined-controlled"
              placeholder='スタートアップのプロダクト開発に興味がある方、お話ししましょう！'
              label="タイトル*"
              InputLabelProps={{ shrink: true }}
              style={{ width: '100%', padding: '0 10px' }}
            />
            <TextField
              id="outlined-controlled"
              placeholder='このアジェンダの概要を記載してください。'
              label="予約概要*"
              InputLabelProps={{ shrink: true }}
              style={{ width: '100%' }}
              multiline
              rows={13}
            />
          </div>
        </Grid>

        <Grid item xs={5}>
          <p className="text-base">時間の設定</p>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <FormControlLabel
              control={<Checkbox checked={checked.checkbox1} onChange={handleChange} name="checkbox1" />}
              label="Checkbox 1"
            />
            <FormControlLabel
              control={<Checkbox checked={checked.checkbox2} onChange={handleChange} name="checkbox2" />}
              label="Checkbox 2"
            />
            <FormControlLabel
              control={<Checkbox checked={checked.checkbox3} onChange={handleChange} name="checkbox3" />}
              label="Checkbox 3"
            />
            <FormControlLabel
              control={<Checkbox checked={checked.checkbox4} onChange={handleChange} name="checkbox4" />}
              label="Checkbox 4"
            />
            <FormControlLabel
              control={<Checkbox checked={checked.checkbox5} onChange={handleChange} name="checkbox5" />}
              label="Checkbox 5"
            />
            <FormControlLabel
              control={<Checkbox checked={checked.checkbox6} onChange={handleChange} name="checkbox6" />}
              label="Checkbox 6"
            />
            <FormControlLabel
              control={<Checkbox checked={checked.checkbox7} onChange={handleChange} name="checkbox7" />}
              label="Checkbox 7"
            />
            <FormControlLabel
              control={<Checkbox checked={checked.checkbox8} onChange={handleChange} name="checkbox8" />}
              label="Checkbox 8"
            />
          </div>

        </Grid>
      </Grid>

      <div className="flex flex-col items-center mt-14">

        <p>上記内容でよろしければ登録ボタンをクリックしてアジェンダを作成してください</p>
        <button className="bg-[#BA00FF] rounded-[4px] py-2 px-8 ">
          <p>登録</p>
        </button>
      </div>
    </div>
  )
}

export default AddNewForm