type Expense = {
  id: number;
  category_name: string,
  user_name: string;
  description: string;
  amount: number;
  interval: number;
  date: string;
  category: number;
  user: number
};
type Revenue = {
  id: number;
  user_name: string;
  description: string;
  amount: number;
  date: string;
  user: number
};
type Category = {
  id: number;
  name: string;
}

type Notification = {
  type: string;
  message: string;
}

export type {Expense, Revenue, Category, Notification}