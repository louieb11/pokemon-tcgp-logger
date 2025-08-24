// app/page.tsx
import { Deck } from '@/types';
import { popularDecks } from '@/lib/mock-data'; // Keep mock data as a fallback
import Logger from '@/components/Logger';

async function getDecks(): Promise<Deck[]> {
  try {
    // Fetch from our own API route with revalidation
    // We calculate a week in seconds: 60 seconds * 60 minutes * 24 hours * 7 days
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/decks`, {
      next: { revalidate: 60 * 60 * 24 * 7 }
    });
    
    if (!res.ok) {
      // If the API fails, we return the mock data so the app still works
      console.error("Failed to fetch decks, using mock data.");
      return popularDecks;
    }

    const decks = await res.json();
    return decks;
  } catch (error) {
    console.error("Error in getDecks:", error);
    return popularDecks; // Fallback on any other error
  }
}


export default async function HomePage() {
  const decks = await getDecks();
  
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-4 md:p-8 bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Pokémon TCG Pocket Ranked Logger</h1>
        <p className="text-lg text-gray-400 mt-2">Track your session stats and climb the ladder! 🪜</p>
      </div>

      <Logger initialDecks={decks} />
    </main>
  );
}