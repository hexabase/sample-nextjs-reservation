export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};

export type TAddUser = {
  added: boolean;
  exists: boolean;
  u_id?: string;
  username?: string;
};

export type TUserInviteStatus = {
  email: string;
  status: number;
};

export type TUserInvite = TUserInviteStatus[] | null;

export enum ETypeStatus {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum EMessageError {
  ERR_01 = '予期せぬエラーが発生しました',
}

const notificationTypes = [ETypeStatus.SUCCESS, ETypeStatus.ERROR, ETypeStatus.WARNING] as const;
export type TNotificationTypes = (typeof notificationTypes)[number];

export type TNotification = {
  open: boolean;
  type?: TNotificationTypes;
  message?: string;
};

export type TPwdPolicy = {
  expired_day: number;
  is_expired_day_warn: boolean;
  lockout_count: number;
  lockout_time: number;
  max_length: number;
  min_length: number;
  pattern_check_type: number;
  same_limit: number;
  use_expired_day: boolean;
  use_language_en: boolean;
  use_language_ja: boolean;
  use_lockout_count: boolean;
  use_lockout_time: boolean;
  use_max_length: boolean;
  use_min_length: boolean;
  use_pattern_check: boolean;
  use_same_limit: boolean;
};

export type TWorkspace = {
  access_key: string;
  created_at: string;
  disable_ui_access: boolean;
  display_id: string;
  g_id: string;
  id: string;
  index: number;
  is_root: boolean;
  name: string;
};

export type TUserConfirm = {
  confirmation_id: string;
  confirmed: boolean;
  current_workspace_id: string;
  email: string;
  email_confirmed: boolean;
  id: string;
  isElapsed: boolean;
  pwd_policy: TPwdPolicy;
  workspace: TWorkspace;
};

export type TConfirmRegistration = {
  user: TUserConfirm;
};

export type TInputRegisterUser = {
  confirmation_id: string;
  email: string;
  username: string;
  password: string;
  workspace: string;
};

export type TGetUserInfo = {
  u_id: string;
  username: string;
  email: string;
  is_ws_admin: boolean;
  profile_pic: string;
};

export type TRegisterUser = {
  token: string;
};

export type TInputCreateItem = {
  user_id: string;
  position: string;
  name: string;
};

export type TLogin = {
  token: string;
};

export type TInputLogin = {
  email: string;
  password: string;
};

export type TUploadFileRespond = {
  file_id: string;
};

export type TRecruitersItems = {
  created_at: string;
  created_by: string;
  d_id: string;
  i_id: string;
  id: string;
  p_id: string;
  rev_no: string;
  recruiter_id: string;
  user_id: string;
  name: string;
  position: string;
};

export type TReservationSearchPayloadOption = {
  conditions: TReservationSearchCondition[];
  sort_field_id?: string;
  sort_order?: string;
  use_or_condition?: boolean;
};

export type TReservationSearchCondition = {
  id?: string;
  search_value: string[];
};

export type TReservationSearchLoad = {
  conditions: TReservationSearchCondition[];
  sort_field_id?: string;
  sort_order?: string;
  use_or_condition?: boolean;
  page: number;
  per_page: number;
  use_display_id?: boolean;
  include_lookups: boolean;
};

export type TReservationRespond = {
  a_id: string;
  created_at: string;
  created_by: string;
  d_id: string;
  date: string;
  i_id: string;
  image: string;
  p_id: string;
  recruiter_id: string;
  reservation_detail: string;
  reservation_id: string;
  rev_no: string;
  status_id: string;
  time_10: string;
  time_11: string;
  time_12: string;
  time_13: string;
  time_14: string;
  time_15: string;
  time_16: string;
  time_17: string;
  title: string;
  updated_at: string;
  updated_by: string;
  lookup_items: any;
};

export type TFieldValue = {
  field_id: string;
  dataType: string;
  value: any;
};

export type TListFieldValues = {
  field_values: TFieldValue[];
  linked_items: any;
};

export type TFieldValueConvert = {
  [key: string]: any;
};

export type TReserSearchCondition = {
  conditions: TReservationSearchCondition[];
};

export type TCreateSubscriber = {
  reservation_id: string;
  time: string;
  name: string;
  email: string;
};
