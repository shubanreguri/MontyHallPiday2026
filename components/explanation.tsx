'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function Explanation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader>
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between p-0 h-auto hover:bg-transparent"
        >
          <CardTitle className="text-lg">Why does switching work?</CardTitle>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </Button>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-3 text-sm leading-relaxed">
            <p className="text-muted-foreground">
              The Monty Hall Problem demonstrates a counterintuitive probability concept. Here's why switching works:
            </p>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p>
                <span className="font-semibold text-primary">Your initial choice has a 1/3 chance</span> of being correct.
              </p>
              <p>
                <span className="font-semibold text-primary">The remaining two doors together have a 2/3 chance</span> of
                containing the car.
              </p>
              <p>
                <span className="font-semibold text-primary">When the host reveals a goat,</span> they're not choosing randomly
                — they know where the car is and always open a door with a goat.
              </p>
              <p>
                <span className="font-semibold text-primary">That 2/3 probability transfers to the remaining unopened door</span>
                . By switching, you're essentially betting on that 2/3 probability instead of your original 1/3.
              </p>
            </div>

            <p className="text-muted-foreground text-xs italic pt-2">
              The effect becomes even more dramatic with more doors. With 10 doors, your initial choice has a 1/10 chance of
              being correct, but switching gives you a 9/10 chance!
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
