
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface PromotionalAdDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PromotionalAdDialog({ isOpen, onClose }: PromotionalAdDialogProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('promoAdShown', 'true');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden shadow-2xl rounded-xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-headline text-2xl text-primary text-center">
            ✨ Special Feature: Mountain-Style Maggi ✨
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-4 flex flex-col items-center">
          <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Mountain-Style Maggi"
              layout="fill"
              objectFit="cover"
              data-ai-hint="mountain noodles"
            />
          </div>
          <DialogDescription className="text-center text-foreground/90 mb-1 text-md">
            Escape to the mountains with every bite!
          </DialogDescription>
          <p className="text-sm text-muted-foreground text-center mb-6 px-4">
            A comforting bowl of Maggi, infused with aromatic mountain herbs and a touch of smoky flavor. Perfectly soothing, like a warm hug on a chilly day. Try it now!
          </p>
        </div>
        <DialogFooter className="bg-muted/50 p-4 sm:justify-center rounded-b-xl">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="btn-image-effect bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Sounds Delicious! (Close)
            </Button>
          </DialogClose>
        </DialogFooter>
         <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
