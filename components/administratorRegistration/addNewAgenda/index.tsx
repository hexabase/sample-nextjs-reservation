'use client'

import { Grid, TextField } from "@mui/material"
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Formik } from "formik";
import { SchemaRecuiterRegister } from "components/app/(admin)/administrator/Schema";
import { EMessageError, ETypeStatus, TNotification } from "components/types/common";
import { createJobItems, getRecruitersItems, uploadFile } from "components/utils/api";

export interface IAddNewForm {
  setIsAddRegistration: any
}
interface FormValues {
  date: undefined,
  title: string,
  reservation_detail: string,
  time_10: boolean,
  time_11: boolean,
  time_12: boolean,
  time_13: boolean,
  time_14: boolean,
  time_15: boolean,
  time_16: boolean,
  time_17: boolean,
}
const AddNewForm = ({ setIsAddRegistration }: IAddNewForm) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [filesId, setFilesId] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [notification, setNotification] = useState<TNotification>({
    open: false,
  });
  function handleClick() {
    event?.stopPropagation();
    fileInput.current?.click();
  }
  const [checked, setChecked] = useState({
    time_10: false,
    time_11: false,
    time_12: false,
    time_13: false,
    time_14: false,
    time_15: false,
    time_16: false,
    time_17: false,
  });
  const handleChange = (event: any) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const getDataRecruitersItems = async () => {
    try {
      const res = await getRecruitersItems()
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getDataRecruitersItems()
  }, [])
  const uploadImage = async (data: File) => {
    try {
      const formData = new FormData()
      formData.append('file', data)
      formData.append('name', data.name)
      const res = await uploadFile(formData)

      res.data && setFilesId((prevFilesId) => [...prevFilesId, res.data.file_id]);
    } catch (error) {
      setNotification({
        open: true,
        type: ETypeStatus.ERROR,
        message: EMessageError.ERR_01,
      });
    }
  }

  const uploadImageHandler = (images: FileList | null) => {
    if (images && images[0]) {
      console.log('images', images)
      for (let i = 0; i < images.length; i++) {
        uploadImage(images[i]);
      }
      if (images) {
        const filesArray = Array.from(images);
        setFiles(filesArray);
      }
    }
  };

  const createDataJobItems = useCallback(
    async (data: FormValues) => {
      try {
        const res = await createJobItems({
          ...data,
          image: filesId,
        });

        if (res.data) {
          setNotification({
            open: true,
            type: ETypeStatus.SUCCESS,
            message: 'Success',
          });


        }
        setIsAddRegistration(false)
      } catch (error) {
        setNotification({
          open: true,
          type: ETypeStatus.ERROR,
          message: EMessageError.ERR_01,
        });
      }
    },
    [filesId]
  );


  return (
    <div className="px-5 md:px-0 pt-[60px] md:pt-0 pb-12 md:pb-0">
      <p className="font-bold text-lg text-center sm:text-left mb-4">新規アジェンダ登録</p>
      <Formik
        initialValues={{
          date: undefined,
          title: '',
          reservation_detail: '',
          time_10: false,
          time_11: false,
          time_12: false,
          time_13: false,
          time_14: false,
          time_15: false,
          time_16: false,
          time_17: false,
        }
        }
        validationSchema={SchemaRecuiterRegister}
        onSubmit={(data) =>
          createDataJobItems(data)
        }
      >
        {
          ({
            values,
            errors,
            touched,
            isValid,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container className="flex-wrap md:flex-nowrap gap-10">
                <Grid item xs={12} md={7}>
                  <p className="mb-8 pl-3 md:pl-0 text-sm md:text-base">必要事項を入力して「登録」ボタンをクリックしてください</p>

                  <div className="flex flex-col gap-10">
                    <input type="date"
                      id="date"
                      value={values.date}
                      onChange={handleChange}
                      className="border border-solid border-[#000000]/[0.36] rounded-[4px] 
                      p-4"
                      placeholder="カレンダーから選択"
                    />

                    <TextField
                      id="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      placeholder='スタートアップのプロダクト開発に興味がある方、お話ししましょう！'
                      label="タイトル*"
                      InputLabelProps={{ shrink: true }}
                      style={{ width: '100%', }}
                    />
                    <TextField
                      id="reservation_detail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reservation_detail}
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
                      onChange={(event) => {
                        uploadImageHandler(event.target.files);
                      }}
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
                        value={values.time_10}
                        checked={values.time_10}
                        onChange={handleChange}
                        name="time_10"
                      />}
                      label="10.00"
                    />
                    <FormControlLabel

                      control={<Checkbox
                        color="primary"
                        value={values.time_11}
                        checked={values.time_11} onChange={handleChange} name="time_11" />}
                      label="11.00"
                    />
                    <FormControlLabel

                      control={<Checkbox
                        color="primary"
                        value={values.time_12}
                        checked={values.time_12} onChange={handleChange} name="time_12" />}
                      label="12.00"
                    />
                    <FormControlLabel

                      control={<Checkbox
                        color="primary"
                        value={values.time_13}
                        checked={values.time_13} onChange={handleChange} name="time_13" />}
                      label="13.00"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        color="primary"
                        value={values.time_14}
                        checked={values.time_14} onChange={handleChange} name="time_14" />}
                      label="14.00"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        color="primary"
                        value={values.time_15}
                        checked={values.time_15} onChange={handleChange} name="time_15" />}
                      label="15.00"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        color="primary"
                        value={values.time_16}
                        checked={values.time_16} onChange={handleChange} name="time_16" />}
                      label="16.00"
                    />
                    <FormControlLabel
                      control={<Checkbox
                        color="primary"
                        value={values.time_17}
                        checked={values.time_17} onChange={handleChange} name="time_17" />}
                      label="17.00"
                    />

                  </div>
                </Grid>
              </Grid>

              <div className="flex flex-col items-center mt-14 sm:mb-10">
                <p>上記内容でよろしければ登録ボタンをクリックしてアジェンダを作成してください</p>
                <button
                  type="submit"
                  className="max-w-[381px] w-full bg-[#BA00FF] rounded-[4px] py-2 px-8 text-[#fff] mt-4 hover:bg-[#ba00ff]/[0.6]">
                  <p>登録</p>
                </button>
              </div>
            </form>
          )
        }
      </Formik>

    </div>
  )
}

export default AddNewForm