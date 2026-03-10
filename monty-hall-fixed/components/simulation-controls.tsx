'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

interface SimulationControlsProps {
  onRun100: () => void;
  onRun1000: () => void;
  onReset: () => void;
  disabled?: boolean;
}

export function SimulationControls({
  onRun100,
  onRun1000,
  onReset,
  disabled = false,
}: SimulationControlsProps) {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun100 = async () => {
    setIsRunning(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onRun100();
    setIsRunning(false);
  };

  const handleRun1000 = async () => {
    setIsRunning(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onRun1000();
    setIsRunning(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Simulation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={handleRun100}
            variant="outline"
            disabled={disabled || isRunning}
            className="flex-1 min-w-32"
          >
            {isRunning ? 'Running...' : 'Run 100 Games'}
          </Button>
          <Button
            onClick={handleRun1000}
            variant="outline"
            disabled={disabled || isRunning}
            className="flex-1 min-w-32"
          >
            {isRunning ? 'Running...' : 'Run 1000 Games'}
          </Button>
          <Button onClick={onReset} variant="ghost" disabled={disabled} className="flex-1 min-w-32">
            Reset Stats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
