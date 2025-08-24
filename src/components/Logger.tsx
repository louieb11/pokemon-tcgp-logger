// app/components/Logger.tsx
'use client';

import { useState } from 'react';
import { GameLog, Deck } from '@/types';
import GameLogger from '@/components/GameLogger';
import SessionStats from '@/components/SessionStats';
import GameLogList from '@/components/GameLogList';
import { toast } from 'sonner';

interface LoggerProps {
  initialDecks: Deck[];
}

export default function Logger({ initialDecks }: LoggerProps) {
  const [gameLogs, setGameLogs] = useState<GameLog[]>([]);

  const handleAddGame = (newGame: Omit<GameLog, 'id'>) => {
    const gameWithId: GameLog = {
      ...newGame,
      id: new Date().toISOString(),
    };
    setGameLogs(prevLogs => [...prevLogs, gameWithId]);
  };

  const handleResetSession = () => {
    // 2. Replace window.confirm with a toast notification
    toast("Are you sure you want to clear the session?", {
      action: {
        label: "Confirm",
        onClick: () => {
          setGameLogs([]);
          toast.success("Session has been cleared.");
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          // No action needed for cancel, just close the toast
        },
      },
    });
  };

return (
    // This is our main layout container.
    // It's a column on small screens and a row on medium screens and up.
   <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">


      <div className="lg:col-span-1 flex flex-col gap-4 lg:sticky lg:top-8">
        <GameLogger decks={initialDecks} onAddGame={handleAddGame} />
        {gameLogs.length > 0 && (
          <button
            onClick={handleResetSession}
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
          >
            Reset Session
          </button>
        )}
      </div>

      <div className="lg:col-span-1">
        <SessionStats logs={gameLogs} />
      </div>

      {/* --- Column 3 (History) --- */}
      <div className="lg:col-span-1">
        <GameLogList logs={gameLogs} />
      </div>

    </div>
  );
}