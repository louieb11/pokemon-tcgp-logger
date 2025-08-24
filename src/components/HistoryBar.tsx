// app/components/HistoryBar.tsx
'use client';
import { GameLog } from "@/types";

export default function HistoryBar({ logs }: { logs: GameLog[] }) {
  const getResultColor = (result: 'win' | 'loss' | 'tie') => {
    if (result === 'win') return 'bg-green-500';
    if (result === 'loss') return 'bg-red-500';
    return 'bg-gray-500';
  };

  // Show the last 10 games, or fewer if the session is new
  const recentGames = logs.slice(-10);

  return (
    <div className="flex gap-1.5 p-2 bg-gray-900/50 rounded-lg">
      {recentGames.map((log) => (
        <div
          key={log.id}
          title={log.result.toUpperCase()}
          className={`h-5 w-5 rounded-sm ${getResultColor(log.result)}`}
        />
      ))}
    </div>
  );
}