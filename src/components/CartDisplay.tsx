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
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <ShoppingCart className="mr-3 h-7 w-7 text-primary" />
          Your Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Your cart is empty. Add some delicious items from the menu!</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
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
        <CardFooter className="flex flex-col items-stretch space-y-4 pt-4">
          <Separator />
          <div className="flex justify-between items-center font-headline text-xl font-semibold">
            <span>Total:</span>
            <span>{CURRENCY_SYMBOL}{totalPrice.toFixed(2)}</span>
          </div>
          <Button
            onClick={onSubmitOrder}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
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
