'use client';

import { useState, useEffect } from 'react';
import type { Door } from '@/hooks/use-monty-hall';

interface Door3DCssProps {
  door: Door;
  onClick: () => void;
  disabled?: boolean;
}

export function Door3DCss({ door, onClick, disabled }: Door3DCssProps) {
  const [hasFlipped, setHasFlipped] = useState(false);

  useEffect(() => {
    if (door.isRevealed && !hasFlipped) {
      setHasFlipped(true);
    } else if (!door.isRevealed && hasFlipped) {
      setHasFlipped(false);
    }
  }, [door.isRevealed, hasFlipped]);

  const isSelected = door.isSelected;
  const isRevealed = door.isRevealed || hasFlipped;
  const hasPrize = door.hasPrize;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative cursor-pointer disabled:cursor-not-allowed"
      style={{
        perspective: '1000px',
        width: '120px',
        height: '180px',
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-600"
        style={{
          transformStyle: 'preserve-3d',
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front face - Closed Door */}
        <div
          className="absolute w-full h-full bg-gradient-to-b from-primary to-primary/80 rounded-xl flex items-center justify-center border-2 border-primary/50 cursor-pointer group"
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: isSelected
              ? '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(255,255,255,0.1)'
              : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(255,255,255,0.05)',
          }}
        >
          <div className="text-center">
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🚪</div>
            <p className="text-xs text-primary-foreground font-semibold">Door {door.id + 1}</p>
          </div>

          {/* Selection glow */}
          {isSelected && (
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.5)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          )}

          {/* Hover effect */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Back face - Revealed Content */}
        <div
          className="absolute w-full h-full bg-gradient-to-b from-accent to-accent/80 rounded-xl flex items-center justify-center border-2 border-accent/50 flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow:
              '0 8px 32px rgba(110, 197, 255, 0.3), inset 0 0 20px rgba(255,255,255,0.1)',
          }}
        >
          <div className="text-5xl mb-2">{hasPrize ? '🚗' : '🐐'}</div>
          <p className="text-xs text-accent-foreground font-semibold">
            {hasPrize ? 'Car!' : 'Goat'}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.5);
          }
          50% {
            box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.8);
          }
        }
      `}</style>
    </button>
  );
}
