
'use client';

import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageLightboxProps {
  imageUrl: string | null;
  imageAlt: string;
  onClose: () => void;
}

export function ImageLightbox({ imageUrl, imageAlt, onClose }: ImageLightboxProps) {
  return (
    <Dialog open={!!imageUrl} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="p-0 m-0 bg-transparent border-0 w-screen h-screen max-w-none flex items-center justify-center">
        {imageUrl && (
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
