export interface IProducts {
  _id: string;
  title: string;
  img?: string;
  category: ICategory;
  price: number;
  published: boolean;
}

export interface ICategory {
  _id: string;
  title: string;
}

export interface IError {
  message: string;
}

export interface ICreateProduct {
  title: string;
  img?: string;
  category: string | ICategory;
  price: number;
  published: boolean;
}

export interface IUpdateProduct extends ICreateProduct {
  _id: string;
}
