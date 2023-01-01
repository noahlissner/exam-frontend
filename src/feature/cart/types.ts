export interface ICartItem extends IProduct {
  cartQuantity: number;
}

export interface IProduct {
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
