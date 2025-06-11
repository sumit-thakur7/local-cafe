
'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from 'lucide-react';

interface CustomerNameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function CustomerNameDialog({ isOpen, onClose, onSubmit }: CustomerNameDialogProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
    } else {
      // Optionally, show a validation message or handle empty name case
      // For now, it just won't submit if name is empty, handled in parent
      onSubmit(name.trim()); // Parent will show toast
    }
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex justify-center mb-3">
            <User className="h-12 w-12 text-primary" />
          </div>
          <AlertDialogTitle className="font-headline text-xl text-center">What's your good name?</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-md">
            Please enter your name so we know who this order is for.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4 space-y-2">
          <Label htmlFor="customerName" className="text-sm font-medium">Your Name</Label>
          <Input 
            id="customerName" 
            placeholder="e.g., John Doe" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="text-base"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Proceed with Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
