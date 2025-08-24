
'use client';

import { useContext } from 'react';
import { GamificationContext } from '@/providers/GamificationProvider';

export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (context === undefined) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
};
