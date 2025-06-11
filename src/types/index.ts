export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  aiHint?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
