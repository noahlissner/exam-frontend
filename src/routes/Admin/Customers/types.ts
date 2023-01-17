export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  street: string;
  zip: number;
  city: string;
}

export interface ICreateCustomer {
  name: string;
  email: string;
  street: string;
  zip: number;
  city: string;
}

export interface IUpdateCustomer extends ICreateCustomer {
  _id: string;
}
