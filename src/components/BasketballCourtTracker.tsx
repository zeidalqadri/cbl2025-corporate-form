import React from 'react';
import { CourtPlayer } from './CourtPlayer';
import { ProgressIndicator } from './ProgressIndicator';

interface Player {
  id: string;
  fullName: string;
  affiliation: string;
}

interface BasketballCourtTrackerProps {
  players: Player[];
  teamName: string;
  company1: string;
  company2: string;
  paymentFile: File | null;
  isValidated: boolean;
}

export const BasketballCourtTracker: React.FC<BasketballCourtTrackerProps> = ({
  players,
  teamName,
  company1,
  company2,
  paymentFile,
  isValidated,
}) => {
  // Calculate progress metrics
  const totalPlayers = 15;
  const filledPlayers = players.filter(p => p.fullName.trim()).length;
  const playerProgress = (filledPlayers / totalPlayers) * 100;
  
  const teamInfoComplete = teamName.trim() && company1.trim();
  const paymentComplete = !!paymentFile;
  
  // Generate court positions (5 starters + 10 bench)
  const starterPositions = [
    { x: 50, y: 25, label: 'PG' }, // Point Guard
    { x: 25, y: 45, label: 'SG' }, // Shooting Guard  
    { x: 75, y: 45, label: 'SF' }, // Small Forward
    { x: 35, y: 70, label: 'PF' }, // Power Forward
    { x: 65, y: 70, label: 'C' },  // Center
  ];
  
  const benchPositions = Array.from({ length: 10 }, (_, i) => ({
    x: 10 + (i % 5) * 20,
    y: 85 + Math.floor(i / 5) * 8,
    label: `B${i + 1}`,
  }));
  
  const allPositions = [...starterPositions, ...benchPositions];
  
  // Determine player color based on affiliation
  const getPlayerColor = (player: Player) => {
    if (!player.fullName.trim()) return 'gray';
    if (player.affiliation === company1) return 'hsl(var(--primary))';
    if (player.affiliation === company2) return 'hsl(var(--secondary))';
    return 'hsl(var(--accent))';
  };

  return (
    <div className="fixed right-4 top-20 w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50 max-h-[calc(100vh-100px)] overflow-y-auto">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Team Progress</h3>
        <div className="text-sm text-muted-foreground">
          {teamName || 'Team Name'} • {filledPlayers}/{totalPlayers} Players
        </div>
      </div>
      
      {/* Progress Rail */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${Math.min((filledPlayers + (teamInfoComplete ? 5 : 0) + (paymentComplete ? 5 : 0) + (isValidated ? 5 : 0)) / 30 * 100, 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {Math.round((filledPlayers + (teamInfoComplete ? 5 : 0) + (paymentComplete ? 5 : 0) + (isValidated ? 5 : 0)) / 30 * 100)}%
          </span>
        </div>
      </div>
      
      {/* Basketball Court */}
      <div className="bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg p-4 border">
        <svg viewBox="0 0 120 120" className="w-full h-48">
          {/* Half court outline */}
          <rect x="10" y="10" width="100" height="100" fill="#D2B48C" stroke="hsl(var(--border))" strokeWidth="2" />
          
          {/* Center line (left side) */}
          <line x1="10" y1="10" x2="10" y2="110" stroke="hsl(var(--border))" strokeWidth="2" />
          
          {/* Center circle (quarter) */}
          <path d="M 10 45 A 15 15 0 0 1 10 75" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          
          {/* Three-point arc */}
          <path d="M 40 25 A 40 40 0 0 1 40 95" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          
          {/* Free throw line */}
          <line x1="60" y1="45" x2="60" y2="75" stroke="hsl(var(--border))" strokeWidth="2" />
          
          {/* Key/Paint area */}
          <rect x="60" y="45" width="50" height="30" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          
          {/* Basket */}
          <circle cx="105" cy="60" r="4" fill="hsl(var(--destructive))" stroke="hsl(var(--border))" strokeWidth="1" />
          
          {/* Player positions */}
          {allPositions.map((position, index) => {
            const player = players[index] || { id: `empty-${index}`, fullName: '', affiliation: '' };
            return (
              <CourtPlayer
                key={`position-${index}`}
                x={position.x}
                y={position.y}
                player={player}
                color={getPlayerColor(player)}
                position={position.label}
                isStarter={index < 5}
              />
            );
          })}
          
          {/* Court labels */}
          <text x="100" y="25" textAnchor="middle" className="fill-muted-foreground" fontSize="12">
            Starters
          </text>
          <text x="100" y="105" textAnchor="middle" className="fill-muted-foreground" fontSize="12">
            Bench
          </text>
        </svg>
        
        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
            <span className="text-muted-foreground">{company1 || 'Company 1'}</span>
          </div>
          {company2 && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--secondary))' }}></div>
              <span className="text-muted-foreground">{company2}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-muted-foreground">Empty</span>
          </div>
        </div>
      </div>
    </div>
  );
};