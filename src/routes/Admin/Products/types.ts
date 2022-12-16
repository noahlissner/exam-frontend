export interface IProducts {
  _id: string;
  title: string;
  description?: string;
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

export interface IUpdatePublishedData {
  id: string;
  value: boolean;
}
