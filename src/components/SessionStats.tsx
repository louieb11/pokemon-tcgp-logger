// app/components/SessionStats.tsx
import { GameLog } from '@/types';
import DeckIconGroup from './DeckIconGroup';

interface SessionStatsProps {
  logs: GameLog[];
}

interface MatchupStats {
  [opponentDeckName: string]: {
    wins: number;
    losses: number;
    ties: number;
    deckInfo: GameLog['opponentDeck'];
  };
}

interface DeckPerformanceStats {
  [userDeckName: string]: {
    wins: number;
    losses: number;
    ties: number;
    deckInfo: GameLog['userDeck'];
  };
}

export default function SessionStats({ logs }: SessionStatsProps) {
  // --- STATS CALCULATION (EXISTING) ---
  const wins = logs.filter(log => log.result === 'win').length;
  const losses = logs.filter(log => log.result === 'loss').length;
  const ties = logs.filter(log => log.result === 'tie').length;
  
  const totalGames = wins + losses;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0.0';

  // --- NEW: PERFORMANCE BY TURN CALCULATION ---
  const firstTurnLogs = logs.filter(log => log.turnOrder === 'first');
  const secondTurnLogs = logs.filter(log => log.turnOrder === 'second');

  const calcTurnStats = (turnLogs: GameLog[]) => {
    const wins = turnLogs.filter(l => l.result === 'win').length;
    const losses = turnLogs.filter(l => l.result === 'loss').length;
    const ties = turnLogs.filter(l => l.result === 'tie').length;
    const total = wins + losses;
    const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0';
    return { wins, losses, ties, winRate };
  };

  const firstTurnStats = calcTurnStats(firstTurnLogs);
  const secondTurnStats = calcTurnStats(secondTurnLogs);

  // --- NEW: MOST PLAYED DECK CALCULATION ---
  const deckUsage = logs.reduce((acc, log) => {
    const deckName = log.userDeck.name;
    acc[deckName] = (acc[deckName] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const mostPlayedDeckName = Object.keys(deckUsage).reduce((a, b) => deckUsage[a] > deckUsage[b] ? a : b, "");
  const mostPlayedDeck = logs.find(log => log.userDeck.name === mostPlayedDeckName)?.userDeck;

  // --- NEW: STREAK CALCULATION ---
  let currentStreak = 0;
  let streakType: GameLog['result'] | "" = "";
  if (logs.length > 0) {
    const lastResult = logs[logs.length - 1].result;
    if (lastResult !== 'tie') {
      streakType = lastResult;
      for (let i = logs.length - 1; i >= 0; i--) {
        if (logs[i].result === streakType) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }
  const streakText = streakType === 'win' ? `W${currentStreak}` : streakType === 'loss' ? `L${currentStreak}` : '';

  // --- MATCHUP CALCULATION (EXISTING) ---
  const matchupStats: MatchupStats = logs.reduce((acc, log) => {
    const opponentName = log.opponentDeck.name;
    if (!acc[opponentName]) {
      acc[opponentName] = { wins: 0, losses: 0, ties: 0, deckInfo: log.opponentDeck };
    }
    if (log.result === 'win') acc[opponentName].wins++;
    if (log.result === 'loss') acc[opponentName].losses++;
    if (log.result === 'tie') acc[opponentName].ties++;
    return acc;
  }, {} as MatchupStats);

  const deckPerformanceStats: DeckPerformanceStats = logs.reduce((acc, log) => {
    const deckName = log.userDeck.name;
    // Initialize if it's the first time we see this deck
    if (!acc[deckName]) {
      acc[deckName] = { wins: 0, losses: 0, ties: 0, deckInfo: log.userDeck };
    }
    // Increment the result
    if (log.result === 'win') acc[deckName].wins++;
    if (log.result === 'loss') acc[deckName].losses++;
    if (log.result === 'tie') acc[deckName].ties++;
    return acc;
  }, {} as DeckPerformanceStats);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-md text-white">
      {/* NEW: MOST PLAYED DECK DISPLAY */}
      {mostPlayedDeck && (
        <div className="mb-4 pb-4 border-b border-gray-700 text-center">
          <p className="text-sm text-gray-400 uppercase tracking-wider">Most Played</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <DeckIconGroup iconIdentifiers={mostPlayedDeck.iconIdentifiers} />
            <h3 className="text-lg font-bold">{mostPlayedDeck.name}</h3>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Session Summary</h2>
      
      {/* Overall Stats */}
      <div className="grid grid-cols-3 text-center text-lg mb-4">
        <div>
          <p className="text-sm text-gray-400">Record</p>
          <p>
            <span className="font-bold text-green-400">{wins}</span>-
            <span className="font-bold text-red-400">{losses}</span>-
            <span className="font-bold text-gray-400">{ties}</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Current Streak</p>
          {/* NEW: STREAK DISPLAY */}
          <p className={`font-bold ${streakType === 'win' ? 'text-green-400' : 'text-red-400'}`}>
            {currentStreak > 1 ? streakText : '-'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Win Rate</p>
          <p className="font-bold text-blue-400">{winRate}%</p>
        </div>
      </div>
      {(firstTurnLogs.length > 0 || secondTurnLogs.length > 0) && (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3 border-b border-gray-700 pb-2">Performance by Turn</h3>
          <div className="space-y-3">
            {firstTurnLogs.length > 0 && (
              <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
                <span className="font-semibold">Going First</span>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-base">{firstTurnStats.wins}-{firstTurnStats.losses}-{firstTurnStats.ties}</span>
                  <span className="font-bold text-blue-400">{firstTurnStats.winRate}%</span>
                </div>
              </div>
            )}
            {secondTurnLogs.length > 0 && (
              <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
                <span className="font-semibold">Going Second</span>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-base">{secondTurnStats.wins}-{secondTurnStats.losses}-{secondTurnStats.ties}</span>
                  <span className="font-bold text-blue-400">{secondTurnStats.winRate}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {Object.keys(deckPerformanceStats).length > 1 && (
        <div>
          <h3 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">Deck Performance</h3>
          <ul className="space-y-3">
            {Object.values(deckPerformanceStats).map(stats => (
              <li key={stats.deckInfo.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <DeckIconGroup iconIdentifiers={stats.deckInfo.iconIdentifiers} />
                  <span className="font-semibold text-sm">{stats.deckInfo.name}</span>
                </div>
                <div className="font-mono text-base">
                  <span className="text-green-400">{stats.wins}</span>-
                  <span className="text-red-400">{stats.losses}</span>-
                  <span className="text-gray-400">{stats.ties}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Matchup Stats */}
      {Object.keys(matchupStats).length > 0 && (
        <div>
          <h3 className="text-xl font-bold mt-6 mb-3 border-b border-gray-700 pb-2">Matchups</h3>
          <ul className="space-y-3">
            {Object.values(matchupStats).map(stats => (
              <li key={stats.deckInfo.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <DeckIconGroup iconIdentifiers={stats.deckInfo.iconIdentifiers} />
                  <span className="font-semibold">{stats.deckInfo.name}</span>
                </div>
                <div className="font-mono text-base">
                  <span className="text-green-400">{stats.wins}</span>-
                  <span className="text-red-400">{stats.losses}</span>-
                  <span className="text-gray-400">{stats.ties}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}