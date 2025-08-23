'use client';

import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface ImageLightboxProps {
  imageUrl: string | null;
  onClose: () => void;
}

export function ImageLightbox({ imageUrl, onClose }: ImageLightboxProps) {
  if (!imageUrl) {
    return null;
  }

  return (
    <Dialog open={!!imageUrl} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none w-screen h-screen max-w-none flex items-center justify-center">
        <div className="relative w-[90vw] h-[90vh]">
          <Image
            src={imageUrl}
            alt="Lightbox image"
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
           <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute -top-4 -right-4 md:top-2 md:right-2 z-50 bg-background/50 hover:bg-background/80 text-foreground rounded-full"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
