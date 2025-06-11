import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";

interface OrderConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderConfirmationDialog({ isOpen, onClose }: OrderConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <AlertDialogTitle className="font-headline text-2xl text-center">Order Sent Successfully!</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-md">
            Your order has been sent to the restaurant manager via WhatsApp. 
            They will contact you shortly if needed. Thank you for your order!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Great!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
