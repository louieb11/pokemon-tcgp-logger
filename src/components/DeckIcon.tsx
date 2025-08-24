// app/components/DeckIcon.tsx
'use client';

import Image from 'next/image';

interface DeckIconProps {
  pokemonName: string;
}

export default function DeckIcon({ pokemonName }: DeckIconProps) {
  // We can return null or a placeholder if there's no name provided
  if (!pokemonName) {
    return <div className="w-12 h-12 bg-gray-700 rounded-full" />;
  }

  // Construct the URL directly from the LimitlessTCG image server
  // We assume gen9 for the current meta, and sanitize the name to lowercase.
  const spriteUrl = `https://r2.limitlesstcg.net/pokemon/gen9/${pokemonName.toLowerCase()}.png`;

  return (
    <Image
      src={spriteUrl}
      alt={pokemonName}
      width={40}
      height={40}
      className="object-contain"
      // Add a simple error handler in case an image doesn't exist
      onError={(e) => {
        // This prevents the broken image icon from showing
        console.error(`Image failed to load: ${spriteUrl}`);
        e.currentTarget.style.display = 'none'; 
      }}
    />
  );
}