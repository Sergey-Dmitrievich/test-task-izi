export interface User {
  id: string;
  date: Date;
  phone: string;
  documentNumber: string;
  paymentArticle: string;
  amount: number;
  author: string;
  cashType: string;
  balanceType: string;
  comments: string;
}



export type SortDirection = 'asc' | 'desc';
export type SortField = keyof User;
