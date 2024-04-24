export interface Address {
  id: number;
  location: string;
  post_office: string;
  police_station: string;
  district: string;
  state: string;
  pin: string;
  phone: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_staff: boolean;
  date_joined: Date;
  is_active: boolean;
  address: Address;
}

export interface Category {
  id: number;
  category: string;
}

export interface FoodMin {
  id: number;
  food_name: string;
  quantity: number;
  posted_at: Date;
  photo: string;
}

export interface Food {
  id: number;
  food_name: string;
  category: Category;
  description: string;
  quantity: number;
  posted_by: User;
  posted_at: Date;
  expired_at: Date;
  is_published: boolean;
  photo?: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  food: FoodMin;
}

export interface Order {
  id: number;
  user: User;
  placed_at: Date;
  updated_at: Date;
  status: string;
  item: OrderItem;
}
