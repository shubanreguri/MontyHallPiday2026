import { useState, useCallback, useEffect } from 'react';

export interface Door {
  id: number;
  isSelected: boolean;
  isRevealed: boolean;
  hasPrize: boolean;
}

export interface Stats {
  totalGames: number;
  stayWins: number;
  switchWins: number;
}

export const useMontyHall = (initialDoors: number = 3) => {
  const [doors, setDoors] = useState<Door[]>([]);
  const [gameState, setGameState] = useState<'choosing' | 'revealing' | 'result'>('choosing');
  const [stats, setStats] = useState<Stats>({
    totalGames: 0,
    stayWins: 0,
    switchWins: 0,
  });
  const [resultMessage, setResultMessage] = useState('');
  const [actionMessage, setActionMessage] = useState('Choose a door');
  const [lastChoice, setLastChoice] = useState<number | null>(null);
  const [revealedDoor, setRevealedDoor] = useState<number | null>(null);
  const [didSwitch, setDidSwitch] = useState(false);

  const resetGame = useCallback(() => {
    const carPosition = Math.floor(Math.random() * initialDoors);
    const newDoors = Array(initialDoors)
      .fill(null)
      .map((_, i) => ({
        id: i,
        isSelected: false,
        isRevealed: false,
        hasPrize: i === carPosition,
      }));

    setDoors(newDoors);
    setGameState('choosing');
    setResultMessage('');
    setActionMessage('Choose a door');
    setLastChoice(null);
    setRevealedDoor(null);
    setDidSwitch(false);
  }, [initialDoors]);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleSelectDoor = useCallback((doorId: number) => {
    if (gameState !== 'choosing') return;

    setLastChoice(doorId);
    
    // Update doors to mark selection
    setDoors((prev) => {
      const updated = prev.map((door) => ({
        ...door,
        isSelected: door.id === doorId,
      }));

      // Find a goat door to reveal
      const unselectedGoatDoors = updated.filter(
        (d) => d.id !== doorId && !d.hasPrize
      );

      if (unselectedGoatDoors.length > 0) {
        const revealed =
          unselectedGoatDoors[Math.floor(Math.random() * unselectedGoatDoors.length)];
        
        setRevealedDoor(revealed.id);
        
        // Mark the revealed door
        return updated.map((door) =>
          door.id === revealed.id ? { ...door, isRevealed: true } : door
        );
      }

      return updated;
    });

    setGameState('revealing');
    setActionMessage('Will you switch or stay?');
  }, [gameState]);

  const handleSwitch = useCallback(
    (chosenDoorId: number) => {
      if (gameState !== 'revealing' || lastChoice === null) return;

      const stayed = chosenDoorId === lastChoice;
      setDidSwitch(!stayed);

      // Reveal all doors
      setDoors((prev) =>
        prev.map((door) => ({
          ...door,
          isRevealed: true,
          isSelected: door.id === chosenDoorId,
        }))
      );

      const finalDoor = doors.find((d) => d.id === chosenDoorId);
      const won = finalDoor?.hasPrize || false;

      setGameState('result');
      setResultMessage(won ? '🎉 You Won! 🎉' : '❌ Game Over');
      setActionMessage(won ? 'You found the car!' : 'You got the goat!');

      // Update stats
      setStats((prev) => ({
        totalGames: prev.totalGames + 1,
        stayWins: stayed && won ? prev.stayWins + 1 : prev.stayWins,
        switchWins: !stayed && won ? prev.switchWins + 1 : prev.switchWins,
      }));
    },
    [gameState, lastChoice, doors]
  );

  const handleResetGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const getActionMessage = () => actionMessage;
  const getResultMessage = () => resultMessage;

  return {
    doors,
    gameState,
    stats,
    handleSelectDoor,
    handleSwitch,
    handleResetGame,
    getActionMessage,
    getResultMessage,
  };
};
