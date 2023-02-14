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