'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Statistics } from '@/hooks/use-monty-hall';

interface StatisticsPanelProps {
  stats: Statistics;
}

export function StatisticsPanel({ stats }: StatisticsPanelProps) {
  const stats_list = [
    {
      label: 'Games Played',
      value: stats.gamesPlayed,
      unit: '',
    },
    {
      label: 'Wins by Staying',
      value: stats.winsByStaying,
      unit: '',
    },
    {
      label: 'Wins by Switching',
      value: stats.winsBySwitching,
      unit: '',
    },
    {
      label: 'Stay Win Rate',
      value: stats.stayingWinRate,
      unit: '%',
    },
    {
      label: 'Switch Win Rate',
      value: stats.switchingWinRate,
      unit: '%',
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {stats_list.map((stat) => (
            <div key={stat.label} className="flex justify-between items-center pb-3 border-b last:border-b-0">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <span className="text-xl font-bold text-primary">
                {stat.value}
                {stat.unit}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
