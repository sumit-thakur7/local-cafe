
import type { MenuItem, CartItem } from '@/types';
import MenuItemCard from './MenuItemCard';

interface MenuListProps {
  menuItems: MenuItem[];
  cartItems: CartItem[]; // Added cartItems to find quantity
  onAddToCart: (item: MenuItem) => void;
  onQuantityChange: (itemId: string, newQuantity: number) => void; // Added onQuantityChange
}

export default function MenuList({ menuItems, cartItems, onAddToCart, onQuantityChange }: MenuListProps) {
  if (!menuItems || menuItems.length === 0) {
    return <p>No menu items available at the moment. Please check back later!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {menuItems.map((item, index) => {
        const cartItem = cartItems.find(ci => ci.id === item.id);
        const cartQuantity = cartItem ? cartItem.quantity : 0;
        return (
          <MenuItemCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            cartQuantity={cartQuantity}
            onQuantityChange={onQuantityChange}
            animationDelay={index * 100}
          />
        );
      })}
    </div>
  );
}
