import IBookingOwner from './IBookingOwner';

export default interface IBookingDetails {
  id?: string;
  title: string;
  start: string;
  end: string;
  owner: IBookingOwner;
}
