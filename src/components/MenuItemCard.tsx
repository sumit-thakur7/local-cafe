import type { MenuItem } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { CURRENCY_SYMBOL } from '@/lib/constants';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 transition-transform">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={`${item.category || ''} ${item.name.split(' ')[0] || ''}`.trim()}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{item.name}</CardTitle>
        <CardDescription className="text-sm mb-2 h-16 overflow-y-auto">{item.description}</CardDescription>
        <p className="font-headline text-lg font-semibold text-primary">{CURRENCY_SYMBOL}{item.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          onClick={() => onAddToCart(item)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          aria-label={`Add ${item.name} to cart`}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
