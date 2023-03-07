export type TimeBooking = {
  time: string;
  isFull: boolean;
}
export type TJob = {
  id: string;
  title: string;
  name: string;
  position: string;
  isAvailable: boolean;
  day: string;
  time: TimeBooking[]

}

export type TAddUser = {
  added: boolean;
  exists: boolean;
  u_id?: string;
  username?: string;
}

export type TUserInviteStatus = {
  email: string;
  status: number;
};

export type TUserInvite = TUserInviteStatus[] | null

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
  user: TUserConfirm,
}

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