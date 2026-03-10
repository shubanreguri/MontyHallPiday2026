'use client';

import { useState, useCallback } from 'react';
import { useMontyHall } from '@/hooks/use-monty-hall';
import { Door3DCss } from '@/components/door-3d-css';

export default function Home() {
  const {
    doors,
    gameState,
    stats,
    handleSelectDoor,
    handleSwitch,
    handleResetGame,
    getActionMessage,
    getResultMessage,
  } = useMontyHall(3);

  const [showMenu, setShowMenu] = useState(false);

  const actionMessage = getActionMessage();
  const resultMessage = getResultMessage();

  const handleDoorClick = useCallback(
    (doorId: number) => {
      if (gameState === 'choosing') {
        handleSelectDoor(doorId);
      } else if (gameState === 'revealing') {
        handleSwitch(doorId);
      }
    },
    [gameState, handleSelectDoor, handleSwitch]
  );

  return (
    <div className="w-full h-screen bg-background overflow-hidden relative flex flex-col">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Top Bar - Title and Menu */}
      <div className="relative z-10 p-6 flex justify-between items-center">
        <div className="text-center flex-1">
          <h1 className="text-5xl font-bold text-primary drop-shadow-lg">Monty Hall</h1>
          <p className="text-sm text-foreground/60 mt-1">Choose wisely. Will you switch?</p>
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border hover:bg-card transition-colors"
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Main Game Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        {/* Doors Container */}
        <div className="perspective mb-12">
          <div
            className="flex gap-8 justify-center items-center"
            style={{
              perspective: '1200px',
            }}
          >
            {doors.map((door) => (
              <Door3DCss
                key={door.id}
                door={door}
                onClick={() => handleDoorClick(door.id)}
                disabled={gameState === 'result'}
              />
            ))}
          </div>
        </div>

        {/* Action Message */}
        <div className="text-center">
          <p className="text-xl font-semibold text-accent mb-6">{actionMessage}</p>

          {resultMessage && (
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary mb-4">{resultMessage}</p>
              <button
                onClick={handleResetGame}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menu Panel */}
      {showMenu && (
        <div className="absolute top-24 right-6 bg-card/95 backdrop-blur-md border border-border rounded-xl p-6 w-72 shadow-2xl z-20">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-primary mb-2">Statistics</h3>
              <div className="space-y-1 text-sm text-foreground/80">
                <p>Games Played: {stats.totalGames}</p>
                <p>Stay Wins: {stats.stayWins}</p>
                <p>Switch Wins: {stats.switchWins}</p>
                {stats.totalGames > 0 && (
                  <>
                    <p className="text-primary mt-2">
                      Switch Win Rate: {Math.round((stats.switchWins / stats.totalGames) * 100)}%
                    </p>
                    <p className="text-accent">
                      Stay Win Rate: {Math.round((stats.stayWins / stats.totalGames) * 100)}%
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-primary mb-3">Options</h3>
              <button
                onClick={() => {
                  handleResetGame();
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
              >
                New Game
              </button>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-primary mb-2">How to Play</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Choose a door. The host reveals a goat. Now decide: stay with your choice or switch to the other unopened door?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
