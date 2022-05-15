export interface User {
  id: number;
  firstName: string;
  lastName: string;
  accountNo: string;
  address: string;
  phone: string;
  new?: boolean;
  updated?: boolean;
}
