export interface IOrder {
  _id: string;
  products: IOrderProduct[];
  customer: IOrderCustomer;
  payment: string;
  shipping: string;
  status: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IOrderProduct {
  _id: string;
  title: string;
  price: number;
  img: string;
  category: string;
  published: boolean;
  __v: number;
}

export interface IOrderCustomer {
  _id: string;
  name: string;
  email: string;
  street: string;
  zip: number;
  city: string;
  __v: number;
}
