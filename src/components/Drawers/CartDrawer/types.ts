export interface ICartItem {
  _id: string;
  title: string;
  img?: string;
  category: ICategory;
  price: number;
  published: boolean;
  cartQuantity: number;
}

export interface ICategory {
  _id: string;
  title: string;
}
