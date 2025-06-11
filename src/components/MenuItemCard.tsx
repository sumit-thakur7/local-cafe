
import type { MenuItem } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CURRENCY_SYMBOL } from '@/lib/constants';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  animationDelay?: number;
}

export default function MenuItemCard({ item, onAddToCart, animationDelay = 0 }: MenuItemCardProps) {
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
      <CardFooter className="p-4 mt-auto">
        <Button
          onClick={() => onAddToCart(item)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base py-3 rounded-lg"
          aria-label={`Add ${item.name} to cart`}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
