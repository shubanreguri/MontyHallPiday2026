'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Statistics } from '@/hooks/use-monty-hall';

interface WinRateChartProps {
  stats: Statistics;
}

export function WinRateChart({ stats }: WinRateChartProps) {
  const data = [
    {
      name: 'Win Rate',
      Stay: stats.stayingWinRate,
      Switch: stats.switchingWinRate,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Win Rates</CardTitle>
      </CardHeader>
      <CardContent>
        {stats.gamesPlayed > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Legend />
              <Bar dataKey="Stay" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Switch" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            Play some games to see the win rate chart
          </div>
        )}
      </CardContent>
    </Card>
  );
}
