// app/api/decks/route.ts
import { NextResponse } from 'next/server';
import { popularDecks } from '@/lib/mock-data'; // Import your mock data

export async function GET() {
  // The real API call is commented out for now.
  /*
  const apiKey = process.env.LIMITLESS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://play.limitlesstcg.com/api/games/PTCGL/decks', {
      headers: { 'X-Access-Key': apiKey },
    });
    // ... rest of the real API logic
  }
  */

  // INSTEAD: We immediately return the mock data.
  console.log("API route is returning mock deck data.");
  return NextResponse.json(popularDecks);
}