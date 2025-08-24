// hooks/usePokemonSprite.ts
import { useEffect, useState } from "react";

const spriteCache: Record<string, string> = {}; // in-memory cache

export function usePokemonSprite(name: string) {
  const [sprite, setSprite] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const lowerName = name.toLowerCase();

    // Check in-memory cache
    if (spriteCache[lowerName]) {
      setSprite(spriteCache[lowerName]);
      return;
    }

    // Check localStorage
    const cached = localStorage.getItem(`sprite-${lowerName}`);
    if (cached) {
      spriteCache[lowerName] = cached;
      setSprite(cached);
      return;
    }

    // Fetch from PokeAPI
    async function fetchSprite() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerName}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();

        // Choose which sprite you want
        const url = data.sprites.other?.["official-artwork"]?.front_default
          || data.sprites.front_default;

        if (url) {
          spriteCache[lowerName] = url;
          localStorage.setItem(`sprite-${lowerName}`, url);
          setSprite(url);
        }
      } catch (err) {
        console.error("Error fetching sprite:", err);
      }
    }

    fetchSprite();
  }, [name]);

  return sprite;
}
