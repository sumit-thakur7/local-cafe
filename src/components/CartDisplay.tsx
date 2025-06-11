
import type { CartItem } from '@/types';
import CartItemDisplay from './CartItemDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Send, ShoppingCart } from 'lucide-react';
import { CURRENCY_SYMBOL } from '@/lib/constants';

interface CartDisplayProps {
  cartItems: CartItem[];
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onSubmitOrder: () => void;
}

export default function CartDisplay({ cartItems, onQuantityChange, onRemoveItem, onSubmitOrder }: CartDisplayProps) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Card className="shadow-xl flex flex-col h-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center text-primary">
          <ShoppingCart className="mr-3 h-7 w-7" />
          Your Order
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/30 mb-6" />
            <p className="text-xl font-semibold text-foreground mb-1">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Explore our menu and add your favorites!</p>
          </div>
        ) : (
          <div className="space-y-2 pr-1"> {/* Reduced pr slightly if scrollbar is an issue */}
            {cartItems.map((item) => (
              <CartItemDisplay
                key={item.id}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>
        )}
      </CardContent>
      {cartItems.length > 0 && (
        <CardFooter className="flex flex-col items-stretch space-y-4 pt-4 mt-auto border-t">
          <Separator className="my-2" />
          <div className="flex justify-between items-center text-xl">
            <span className="font-headline font-semibold text-foreground">Total:</span>
            <span className="font-headline font-bold text-accent">{CURRENCY_SYMBOL}{totalPrice.toFixed(2)}</span>
          </div>
          <Button
            onClick={onSubmitOrder}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 rounded-lg"
            aria-label="Submit Order"
          >
            <Send className="mr-2 h-5 w-5" />
            Submit Order via WhatsApp
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
