import * as Yup from 'yup';

export const SchemaRecuiterRegister = Yup.object().shape({
  title: Yup.string().required(),
  reservation_detail: Yup.string().required(),
});
