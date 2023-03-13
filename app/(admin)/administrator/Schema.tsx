import * as Yup from 'yup';

export const SchemaRecuiterRegister = Yup.object().shape(
  {
    // date: Yup.string().required(),
    title: Yup.string().required(),
    reservation_detail: Yup.string().required(),
  }
)