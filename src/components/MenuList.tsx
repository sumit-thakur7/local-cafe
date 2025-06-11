import type { MenuItem } from '@/types';
import MenuItemCard from './MenuItemCard';

interface MenuListProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuList({ menuItems, onAddToCart }: MenuListProps) {
  if (!menuItems || menuItems.length === 0) {
    return <p>No menu items available at the moment. Please check back later!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {menuItems.map((item, index) => (
        <MenuItemCard 
          key={item.id} 
          item={item} 
          onAddToCart={onAddToCart} 
          animationDelay={index * 100} 
        />
      ))}
    </div>
  );
}
