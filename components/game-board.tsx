'use client';

import { Door } from './door';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GameState } from '@/hooks/use-monty-hall';

interface GameBoardProps {
  gameState: GameState;
  onChooseDoor: (doorIndex: number) => void;
  onStay: () => void;
  onSwitch: () => void;
  onPlayAgain: () => void;
  disabled?: boolean;
}

export function GameBoard({
  gameState,
  onChooseDoor,
  onStay,
  onSwitch,
  onPlayAgain,
  disabled = false,
}: GameBoardProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Doors Grid */}
      <div className={cn('flex gap-6 justify-center flex-wrap', 'max-w-2xl')}>
        {gameState.doors.map((hasCar, idx) => (
          <Door
            key={idx}
            doorNumber={idx + 1}
            isOpen={gameState.openedDoor === idx}
            hasCar={hasCar}
            isSelected={gameState.playerChoice === idx}
            isRevealed={gameState.finalChoice === idx && gameState.gamePhase === 'result'}
            onClick={() => {
              if (gameState.gamePhase === 'choosing') {
                onChooseDoor(idx);
              }
            }}
            disabled={
              disabled ||
              gameState.gamePhase !== 'choosing' ||
              (gameState.gamePhase === 'choosing' && gameState.playerChoice !== null)
            }
          />
        ))}
      </div>

      {/* Game Phase Messages */}
      <div className="h-16 flex items-center justify-center">
        {gameState.gamePhase === 'choosing' && gameState.playerChoice === null && (
          <p className="text-lg font-semibold text-center text-muted-foreground">
            Choose a door to start
          </p>
        )}

        {gameState.gamePhase === 'switching' && gameState.playerChoice !== null && (
          <p className="text-lg font-semibold text-center text-primary">
            Do you want to stay with your choice or switch?
          </p>
        )}

        {gameState.gamePhase === 'result' && (
          <div className="text-center">
            {gameState.result === 'win' ? (
              <p className="text-2xl font-bold text-accent">You won a car! 🎉</p>
            ) : (
              <p className="text-2xl font-bold text-destructive">You got a goat 🐐</p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center flex-wrap">
        {gameState.gamePhase === 'switching' && gameState.playerChoice !== null && (
          <>
            <Button onClick={onStay} size="lg" variant="default" disabled={disabled}>
              Stay
            </Button>
            <Button onClick={onSwitch} size="lg" variant="outline" disabled={disabled}>
              Switch
            </Button>
          </>
        )}

        {gameState.gamePhase === 'result' && (
          <Button onClick={onPlayAgain} size="lg" variant="default" disabled={disabled}>
            Play Again
          </Button>
        )}

        {gameState.gamePhase === 'idle' && (
          <Button onClick={onPlayAgain} size="lg" variant="default" disabled={disabled}>
            Start Game
          </Button>
        )}
      </div>
    </div>
  );
}
