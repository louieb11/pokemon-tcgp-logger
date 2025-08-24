// app/components/GameLogger.tsx
'use client';

import { useState } from 'react';
import { Deck, GameLog } from '@/types';
import DeckSelector from './DeckSelector'; 

interface GameLoggerProps {
  decks: Deck[];
  onAddGame: (game: Omit<GameLog, 'id'>) => void;
}

export default function GameLogger({ decks, onAddGame }: GameLoggerProps) {

    if (!decks || decks.length === 0) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Loading Decks...</h2>
      </div>
    );
  }
  // 2. Update state to hold the full Deck object, not 'undefined'
  const [userDeck, setUserDeck] = useState<Deck>(decks[0]);
  const [opponentDeck, setOpponentDeck] = useState<Deck>(decks[0]);

  const [turnOrder, setTurnOrder] = useState<'first' | 'second' | undefined>();

  const handleSubmit = (result: 'win' | 'loss' | 'tie') => {
    if (!userDeck || !opponentDeck) return;
    onAddGame({ userDeck, opponentDeck, result, turnOrder });
    // Clear the selection for the next game
    setTurnOrder(undefined);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-4">Log a New Game</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Your Deck</label>
          <DeckSelector 
            decks={decks} 
            selectedDeck={userDeck} 
            setSelectedDeck={setUserDeck} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Opponent's Deck</label>
          <DeckSelector 
            decks={decks} 
            selectedDeck={opponentDeck} 
            setSelectedDeck={setOpponentDeck} 
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Did I Go First or Second? (Optional)</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setTurnOrder(turnOrder === 'first' ? undefined : 'first')}
            className={`py-2 text-sm font-semibold rounded-lg transition-colors ${
              turnOrder === 'first'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Went First
          </button>
          <button
            onClick={() => setTurnOrder(turnOrder === 'second' ? undefined : 'second')}
            className={`py-2 text-sm font-semibold rounded-lg transition-colors ${
              turnOrder === 'second'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Went Second
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-around">
        <button
          onClick={() => handleSubmit('win')}
          className="px-8 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
        >
          WIN
        </button>
        <button
          onClick={() => handleSubmit('tie')}
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
        >
          TIE
        </button>
        <button
          onClick={() => handleSubmit('loss')}
          className="px-8 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        >
          LOSS
        </button>
      </div>
    </div>
  );
}