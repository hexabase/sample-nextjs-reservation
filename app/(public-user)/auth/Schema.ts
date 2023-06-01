import * as Yup from 'yup';

export const SchemaLogin = Yup.object().shape({
  email: Yup.string()
    .email('メールアドレスの形式が正しくありません')
    .required('メールアドレスを入力してください'),
  password: Yup.string().required('パスワードを入力してください'),
});

export const SchemaRegisterAdmin = Yup.object().shape({
  username: Yup.string().required('お名前を入力してください'),
  position: Yup.string().required('役職を入力してください'),
  password: Yup.string().min(8, 'パスワードが短すぎます').required('パスワードを入力してください'),
});

export const EmailRegistration = Yup.object().shape({
  email: Yup.string()
    .email('メールアドレスの形式が正しくありません')
    .required('メールアドレスを入力してください'),
});

export const ReservationRegistration = Yup.object().shape({
  name: Yup.string().required('お名前を入力してください'),
  email: Yup.string()
    .email('メールアドレスの形式が正しくありません')
    .required('メールアドレスを入力してください'),
});
