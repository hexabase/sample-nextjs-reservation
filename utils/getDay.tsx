import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
export const getTimeJP = (day?: string) => {
  if (day) {
    const myDate = new Date(day);
    const formattedDate = format(myDate, 'M月d日(EE)', { locale: ja });
    return formattedDate;
  }
  return null;
};

export const getYearMonthDay = (day: string) => {
  if (day) {
    const myDate = new Date(day);
    const formattedDate = format(myDate, 'yyyy/M/d (EE)', { locale: ja });
    return formattedDate;
  }
  return null;
};

export const getYearMonthDayJP = (day: string) => {
  if (day) {
    const myDate = new Date(day);
    const formattedDate = format(myDate, 'yyyy年M月d日(EEE)', { locale: ja });
    return formattedDate;
  }
  return null;
};

export const converTime = (time: string) => {
  if (time) {
    const timeReservation = time.substring(5);
    let formattedStr = timeReservation + '.00';
    return formattedStr;
  }
};
