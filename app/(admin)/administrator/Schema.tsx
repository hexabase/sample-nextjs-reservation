import * as Yup from 'yup';

export const SchemaReservationRegister = Yup.object().shape({
  date: Yup.string().required('日程を入力してください'),
  title: Yup.string().required('タイトルを入力してください'),
  reservation_detail: Yup.string().required('予約概要を入力してください'),
});
