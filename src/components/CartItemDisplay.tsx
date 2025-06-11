
import type { CartItem } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { CURRENCY_SYMBOL } from '@/lib/constants';

interface CartItemDisplayProps {
  item: CartItem;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export default function CartItemDisplay({ item, onQuantityChange, onRemoveItem }: CartItemDisplayProps) {
  const handleIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    } else {
      onRemoveItem(item.id); // Or onQuantityChange(item.id, 0) if you prefer
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      if (newQuantity === 0) {
        onRemoveItem(item.id);
      } else {
        onQuantityChange(item.id, newQuantity);
      }
    }
  };


  return (
    <div className="flex items-center justify-between p-3 border-b border-border last:border-b-0 bg-card rounded-lg mb-2 shadow-sm">
      {/* Container for image and text. This should take available space and allow its content to shrink. */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <Image 
          src={item.imageUrl} 
          alt={item.name} 
          width={64} 
          height={64} 
          className="rounded-md object-cover h-16 w-16 flex-shrink-0" 
          data-ai-hint={item.aiHint || `${item.category || ''} ${item.name.split(' ')[0] || ''}`.trim()} 
        />
        {/* Container for name and price. This should also allow its content (the name) to truncate. */}
        <div className="min-w-0">
          <h4 className="font-headline text-md font-semibold truncate">{item.name}</h4>
          <p className="text-sm text-muted-foreground">{CURRENCY_SYMBOL}{item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Container for quantity controls. This should not shrink. */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <Button variant="ghost" size="icon" onClick={handleDecrement} aria-label="Decrease quantity">
          <MinusCircle className="h-5 w-5 text-destructive" />
        </Button>
        <Input 
          type="number" 
          value={item.quantity} 
          onChange={handleInputChange}
          className="w-12 h-8 text-center px-1"
          aria-label="Item quantity"
        />
        <Button variant="ghost" size="icon" onClick={handleIncrement} aria-label="Increase quantity">
          <PlusCircle className="h-5 w-5 text-primary" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item.id)} aria-label="Remove item">
          <Trash2 className="h-5 w-5 text-destructive" />
        </Button>
      </div>
    </div>
  );
}

