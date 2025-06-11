
import type { MenuItem } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CURRENCY_SYMBOL } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { PlusCircle, MinusCircle } from 'lucide-react';
import type React from 'react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  cartQuantity: number;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  animationDelay?: number;
}

export default function MenuItemCard({ item, onAddToCart, cartQuantity, onQuantityChange, animationDelay = 0 }: MenuItemCardProps) {

  const handleIncrement = () => {
    onQuantityChange(item.id, cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 0) {
      onQuantityChange(item.id, cartQuantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <Card
      className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 rounded-xl animate-fadeInUp opacity-0"
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: 'forwards' }}
    >
      <CardHeader className="p-0 relative">
        <div className="relative w-full h-56">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
            data-ai-hint={item.aiHint || `${item.category || ''} ${item.name.split(' ')[0] || ''}`.trim()}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-2xl font-bold">{item.name}</CardTitle>
            {item.category && (
              <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
            )}
          </div>
          <p className="font-headline text-xl font-semibold text-accent whitespace-nowrap ml-2">
            {CURRENCY_SYMBOL}{item.price.toFixed(2)}
          </p>
        </div>
        <CardDescription className="text-sm text-muted-foreground flex-grow h-20 overflow-y-auto">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 mt-auto flex items-center justify-between space-x-3">
        {cartQuantity > 0 && (
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={handleDecrement} aria-label={`Decrease quantity of ${item.name}`}>
              <MinusCircle className="h-5 w-5" />
            </Button>
            <Input
              type="number"
              value={cartQuantity}
              onChange={handleInputChange}
              className="w-12 h-9 text-center px-1 text-base"
              aria-label={`${item.name} quantity`}
              min="0"
            />
            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={handleIncrement} aria-label={`Increase quantity of ${item.name}`}>
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>
        )}
        <Button
          onClick={() => onAddToCart(item)}
          className={`bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base py-3 rounded-lg ${cartQuantity === 0 ? 'w-full' : 'flex-grow'}`}
          aria-label={`${cartQuantity > 0 ? 'Add one more' : 'Add'} ${item.name} to cart`}
        >
          {cartQuantity > 0 ? 'Add More' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
