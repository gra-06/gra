
'use client';

import { useGamification } from '@/hooks/use-gamification';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import * as Icons from 'lucide-react';
import { Award } from 'lucide-react';
import { Badge as BadgeType } from '@/types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function BadgeCard({ badge, earned }: { badge: BadgeType, earned: boolean }) {
    // @ts-ignore
    const Icon = Icons[badge.icon] || Award;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={cn(
                            'flex flex-col items-center justify-center gap-2 p-4 border rounded-lg aspect-square transition-all',
                            earned
                            ? 'bg-primary/10 border-primary/50'
                            : 'bg-secondary/50 border-border opacity-50 grayscale'
                        )}
                    >
                        <Icon className={cn('w-12 h-12', earned ? 'text-primary' : 'text-muted-foreground')} />
                        <p className="text-center font-bold text-sm">{badge.name}</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs">{badge.description}</p>
                    {!earned && <p className="text-xs text-muted-foreground">Bu rozeti henüz kazanmadın.</p>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function UserBadges() {
  const { isSheetOpen, setSheetOpen, progress, allBadges } = useGamification();

  const earnedBadges = progress.earnedBadges;
  const unearnedBadges = allBadges.filter(b => !earnedBadges.includes(b._id) && !b.secret);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Kazanılan Rozetler</SheetTitle>
          <SheetDescription>
            Siteyi keşfederken kazandığın başarılar.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-8">
            <div>
                <h3 className="font-headline text-lg mb-2">Kazanılanlar ({earnedBadges.length})</h3>
                 {earnedBadges.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {allBadges.filter(b => earnedBadges.includes(b._id)).map(badge => (
                            <BadgeCard key={badge._id} badge={badge} earned />
                        ))}
                    </div>
                 ) : (
                    <p className="text-sm text-muted-foreground">Henüz hiç rozet kazanmadın. Siteyi keşfetmeye devam et!</p>
                 )}
            </div>
             <div>
                <h3 className="font-headline text-lg mb-2">Kazanılacaklar ({unearnedBadges.length})</h3>
                <div className="grid grid-cols-3 gap-4">
                    {unearnedBadges.map(badge => (
                        <BadgeCard key={badge._id} badge={badge} earned={false} />
                    ))}
                </div>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
