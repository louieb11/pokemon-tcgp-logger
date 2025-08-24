// app/types/index.ts

export interface Deck {
  id: string;
  name: string;
  // Change this from a single string to an array of strings
  iconIdentifiers: string[]; 
}

export interface GameLog {
  id: string;
  userDeck: Deck;
  opponentDeck: Deck;
  result: 'win' | 'loss' | 'tie';
  turnOrder?: 'first' | 'second';
}