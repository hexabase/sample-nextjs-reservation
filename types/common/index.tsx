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
