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
      <div className="flex items-center space-x-3">
        <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover h-16 w-16" data-ai-hint={`${item.category || ''} ${item.name.split(' ')[0] || ''}`.trim()} />
        <div>
          <h4 className="font-headline text-md font-semibold">{item.name}</h4>
          <p className="text-sm text-muted-foreground">{CURRENCY_SYMBOL}{item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
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
