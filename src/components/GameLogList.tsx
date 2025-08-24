// app/components/GameLogList.tsx
import { GameLog } from '@/types';
import DeckIconGroup from './DeckIconGroup';
import HistoryBar from './HistoryBar';
import {motion, AnimatePresence} from 'framer-motion';

interface GameLogListProps {
  logs: GameLog[];
}

export default function GameLogList({ logs }: GameLogListProps) {
    const getResultStyles = (result: 'win' | 'loss' | 'tie') => {
    switch (result) {
      case 'win':
        return 'bg-green-500/20 text-green-400';
      case 'loss':
        return 'bg-red-500/20 text-red-400';
      case 'tie':
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-white mb-4">Game History</h2>
      <HistoryBar logs={logs} />
      </div>
      <ul className="space-y-3">
        {logs.length === 0 && <p className="text-gray-400">No games logged yet.</p>}
        <AnimatePresence>
          {logs.slice().reverse().map((log) => (
            // Change `li` to `motion.li` and add animation props
            <motion.li 
              layout // This makes the list re-order smoothly
              initial={{ opacity: 0, y: 20, scale: 0.95 }} // Starts invisible, slightly down, and smaller
              animate={{ opacity: 1, y: 0, scale: 1 }}     // Fades in to its final position and size
              exit={{ opacity: 0, transition: { duration: 0.2 } }} // Fades out when removed
              key={log.id} 
              className={`flex justify-between items-center p-3 rounded-md ${getResultStyles(log.result)}`}
            >
              <div className="flex flex-col text-sm text-center">
                <div className="flex items-center gap-2">
                  <DeckIconGroup iconIdentifiers={log.userDeck.iconIdentifiers} />
                  <span className="text-gray-400 font-bold">vs</span>
                  <DeckIconGroup iconIdentifiers={log.opponentDeck.iconIdentifiers} />
                </div>
                <div className="text-gray-300 mt-1">
                  <span>{log.userDeck.name}</span>
                  <span className="text-gray-500 mx-1">/</span>
                  <span>{log.opponentDeck.name}</span>
                  {log.turnOrder && (
                  <span className="ml-2 text-xs font-bold text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded">
                    {log.turnOrder === 'first' ? '1st' : '2nd'}
                  </span>
                )}
                </div>
              </div>
              <span className={`font-bold text-lg`}>
                {log.result.toUpperCase()}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}