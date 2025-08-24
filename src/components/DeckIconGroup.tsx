// app/components/DeckIconGroup.tsx
'use client';

import DeckIcon from './DeckIcon';

interface DeckIconGroupProps {
  iconIdentifiers: string[];
}

export default function DeckIconGroup({ iconIdentifiers = [] }: DeckIconGroupProps) {
  return (
    <div className="flex gap-1">
      {iconIdentifiers.map((name, index) => (
        <div key={index} className="relative">
          <DeckIcon pokemonName={name} />
        </div>
      ))}
    </div>
  );
}