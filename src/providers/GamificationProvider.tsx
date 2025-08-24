
'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import type { Badge, GameEvent, UserProgress } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { BadgeToast } from '@/components/BadgeToast';

const defaultProgress: UserProgress = {
    events: {},
    uniqueEvents: {},
    earnedBadges: [],
};

interface GamificationContextType {
    progress: UserProgress;
    logEvent: (event: GameEvent, uniqueId?: string) => void;
    allBadges: Badge[];
    isSheetOpen: boolean;
    setSheetOpen: (isOpen: boolean) => void;
}

export const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({
    children,
    allBadges
}: {
    children: React.ReactNode;
    allBadges: Badge[];
}) {
    const [progress, setProgress] = useState<UserProgress>(defaultProgress);
    const [isSheetOpen, setSheetOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('userProgress');
            if (savedProgress) {
                setProgress(JSON.parse(savedProgress));
            }
        } catch (error) {
            console.error("Failed to load user progress from localStorage", error);
            setProgress(defaultProgress);
        }
    }, []);

    const saveProgress = (newProgress: UserProgress) => {
        try {
            localStorage.setItem('userProgress', JSON.stringify(newProgress));
            setProgress(newProgress);
        } catch (error) {
            console.error("Failed to save user progress to localStorage", error);
        }
    };

    const logEvent = useCallback((event: GameEvent, uniqueId?: string) => {
        setProgress(currentProgress => {
            const newProgress = JSON.parse(JSON.stringify(currentProgress)) as UserProgress;

            // Handle unique events
            if (uniqueId) {
                if (!newProgress.uniqueEvents[event]) {
                    newProgress.uniqueEvents[event] = [];
                }
                // If it's already logged, do nothing
                if (newProgress.uniqueEvents[event]?.includes(uniqueId)) {
                    return currentProgress; 
                }
                newProgress.uniqueEvents[event]?.push(uniqueId);
                newProgress.events[event] = (newProgress.uniqueEvents[event]?.length || 0);

            } else {
                 // Handle regular count events
                newProgress.events[event] = (newProgress.events[event] || 0) + 1;
            }

            // Check for new badges
            allBadges.forEach(badge => {
                if (
                    !newProgress.earnedBadges.includes(badge._id) &&
                    badge.event === event &&
                    (newProgress.events[event] || 0) >= badge.count
                ) {
                    newProgress.earnedBadges.push(badge._id);
                    // Show a toast for the new badge
                    toast({
                        duration: 5000,
                        description: <BadgeToast badge={badge} />,
                    });
                }
            });

            saveProgress(newProgress);
            return newProgress;
        });
    }, [allBadges, toast]);

    return (
        <GamificationContext.Provider value={{ progress, logEvent, allBadges, isSheetOpen, setSheetOpen }}>
            {children}
        </GamificationContext.Provider>
    );
}
