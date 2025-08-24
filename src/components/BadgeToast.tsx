
'use client';
import type { Badge as BadgeType } from '@/types';
import { Award } from 'lucide-react';
import * as Icons from 'lucide-react';

interface BadgeToastProps {
  badge: BadgeType;
}

export function BadgeToast({ badge }: BadgeToastProps) {
  // @ts-ignore
  const Icon = Icons[badge.icon] || Award;
  return (
    <div className="flex items-center gap-4">
       <div className="p-3 bg-primary/20 rounded-full">
         <Icon className="w-8 h-8 text-primary" />
       </div>
      <div>
        <p className="font-bold text-base">Rozet Kazanıldı!</p>
        <p className="font-semibold">{badge.name}</p>
        <p className="text-sm text-muted-foreground">{badge.description}</p>
      </div>
    </div>
  );
}
