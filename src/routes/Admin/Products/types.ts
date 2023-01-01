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
