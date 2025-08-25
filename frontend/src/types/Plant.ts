export interface Plant {
  _id: string;
  name: string;
  price: number;
  categories: string[];
  availability: boolean;
  image?: string;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}