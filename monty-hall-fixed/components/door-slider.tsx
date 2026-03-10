'use client';

import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DoorSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function DoorSlider({ value, onChange, disabled = false }: DoorSliderProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Number of Doors: {value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Slider
            value={[value]}
            onValueChange={(vals) => onChange(vals[0])}
            min={3}
            max={20}
            step={1}
            disabled={disabled}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Watch how the probability effect becomes more dramatic with more doors. The switching advantage increases as the
            number of doors increases!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
