
'use client';

import { useState, useEffect } from 'react';
import type { MenuItem, CartItem } from '@/types';
import MenuList from '@/components/MenuList';
import CartDisplay from '@/components/CartDisplay';
import OrderConfirmationDialog from '@/components/OrderConfirmationDialog';
import CustomerNameDialog from '@/components/CustomerNameDialog';
import LoadingScreen from '@/components/LoadingScreen';
import { sampleMenuItems } from '@/data/menu-items';
import { RESTAURANT_WHATSAPP_NUMBER, CURRENCY_SYMBOL } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMenuItems(sampleMenuItems);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsContentLoaded(true), 50); // Content fade-in after loading screen starts hiding
  };

  const handleAddToCart = (itemToAdd: MenuItem) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCartItems, { ...itemToAdd, quantity: 1 }];
    });
    toast({
      title: `${itemToAdd.name} added to cart!`,
      description: "You can adjust quantity in the cart.",
      variant: "default",
      duration: 2000, // Changed to 2 seconds
    });
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
    toast({
      title: "Item removed from cart.",
      variant: "destructive",
    });
  };

  const handleSubmitOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty!",
        description: "Please add items to your cart before submitting.",
        variant: "destructive",
      });
      return;
    }
    setIsNameDialogOpen(true);
  };

  const handleNameSubmitAndProceedToWhatsApp = (customerName: string) => {
    if (!customerName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to proceed.",
        variant: "destructive",
      });
      return;
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    let orderMessage = `New Order from Local Cafe:\n`;
    orderMessage += `Customer Name: ${customerName}\n\n`;
    cartItems.forEach((item) => {
      orderMessage += `- ${item.name} (Qty: ${item.quantity}) - ${CURRENCY_SYMBOL}${(item.price * item.quantity).toFixed(2)}\n`;
    });
    orderMessage += `\nTotal: ${CURRENCY_SYMBOL}${totalPrice.toFixed(2)}\n`;
    orderMessage += `\nPlease confirm this order. Thank you from Local Cafe!`;

    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;

    window.open(whatsappUrl, '_blank');
    setCartItems([]);
    setIsNameDialogOpen(false);
    setIsOrderConfirmationOpen(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return <LoadingScreen onLoaded={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${isContentLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/images/local-logo.jpeg" alt="Cafe Logo" width={208} height={208} className="rounded-full" />
          </div>
          <Button
            variant="ghost"
            className="lg:hidden relative hover:bg-primary/80 h-14 w-14"
            onClick={() => setShowCart(!showCart)}
            aria-label="Toggle Cart"
          >
            <ShoppingCart className="h-12 w-12" />
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl mb-6 text-center lg:text-left">Our Menu</h2>
            <MenuList
              menuItems={menuItems}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onQuantityChange={handleQuantityChange}
            />
          </div>

          <aside className="hidden lg:block lg:col-span-1 sticky top-24 h-[calc(100vh-7rem)]">
            <CartDisplay
              cartItems={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              onSubmitOrder={handleSubmitOrder}
            />
          </aside>
        </div>
      </main>

      {showCart && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setShowCart(false)}>
          <div
            className="fixed bottom-0 left-0 right-0 bg-background p-4 shadow-2xl rounded-t-2xl max-h-[80vh] overflow-y-auto z-50 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <CartDisplay
              cartItems={cartItems}
              onQuantityChange={handleQuantityChange
              }
              onRemoveItem={handleRemoveItem}
              onSubmitOrder={handleSubmitOrder}
            />
            <Button variant="outline" onClick={() => setShowCart(false)} className="w-full mt-4">Close Cart</Button>
          </div>
        </div>
      )}

      <CustomerNameDialog
        isOpen={isNameDialogOpen}
        onClose={() => setIsNameDialogOpen(false)}
        onSubmit={handleNameSubmitAndProceedToWhatsApp}
      />

      <OrderConfirmationDialog
        isOpen={isOrderConfirmationOpen}
        onClose={() => setIsOrderConfirmationOpen(false)}
      />

      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p className="font-body">&copy; {new Date().getFullYear()} Local Cafe. All rights reserved.</p>
      </footer>

      <style jsx global>{`
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
