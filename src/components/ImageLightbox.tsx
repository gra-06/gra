
'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface ImageLightboxProps {
  imageUrl: string | null;
  altText?: string;
  onClose: () => void;
}

export function ImageLightbox({ imageUrl, altText = "Genişletilmiş resim", onClose }: ImageLightboxProps) {
  if (!imageUrl) {
    return null;
  }

  return (
    <Dialog open={!!imageUrl} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none w-screen h-screen max-w-none flex items-center justify-center" aria-label="Resim Görüntüleyici">
        <div className="relative w-[90vw] h-[90vh]">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
           <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute -top-4 -right-4 md:top-2 md:right-2 z-50 bg-background/50 hover:bg-background/80 text-foreground rounded-full"
              aria-label="Resim görüntüleyiciyi kapat"
            >
              <X className="h-6 w-6" />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
