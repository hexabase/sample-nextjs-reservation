import * as Yup from 'yup';

export const SchemaLogin = Yup.object().shape({
  email: Yup.string()
    .email('無効なメールアドレスがありま')
    .required('メールアドレスを入力してください'),
  password: Yup.string()
    .required('パスワードを入力してください'),
})

export const SchemaRegisterAdmin = Yup.object().shape({
  name: Yup.string()
    .required('役職は必須です'),
  position: Yup.string()
    .required('お名前は必須です'),
  password: Yup.string()
    .min(8, 'パスワードが短すぎます')
})

export const EmailRegistration = Yup.object().shape({
  email: Yup.string()
    .email('メールアドレスの形式が正しくありません')
    .required('メールアドレスを入力してください')
})