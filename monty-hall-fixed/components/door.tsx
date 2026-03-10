'use client';

import { cn } from '@/lib/utils';
import { Car, Lightbulb } from 'lucide-react';

interface DoorProps {
  doorNumber: number;
  isOpen?: boolean;
  hasCar?: boolean;
  isSelected?: boolean;
  isRevealed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function Door({
  doorNumber,
  isOpen = false,
  hasCar = false,
  isSelected = false,
  isRevealed = false,
  onClick,
  disabled = false,
}: DoorProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isOpen}
      className={cn(
        'relative w-24 h-32 rounded-lg transition-all duration-300 transform',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        'disabled:cursor-not-allowed',
        isOpen
          ? 'bg-destructive scale-95'
          : isSelected
            ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
            : 'bg-secondary hover:bg-accent hover:shadow-md active:scale-95',
        isRevealed && 'scale-105 shadow-xl',
      )}
    >
      {isOpen || isRevealed ? (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {hasCar ? (
            <>
              <Car className="w-8 h-8" />
              <span className="text-xs font-semibold">Car</span>
            </>
          ) : (
            <>
              <Lightbulb className="w-8 h-8 text-muted-foreground" />
              <span className="text-xs font-semibold">Goat</span>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <div className="w-6 h-6 rounded border-2 border-current opacity-60" />
          <span className="text-lg font-bold">Door {doorNumber}</span>
        </div>
      )}
    </button>
  );
}
