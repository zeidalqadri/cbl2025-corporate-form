import React from 'react';

interface Player {
  id: string;
  fullName: string;
  icPassport: string;
  email: string;
  phone: string;
  affiliation: string;
  relationshipType: string;
}

interface CourtPlayerProps {
  x: number;
  y: number;
  player: Player;
  color: string;
  position: string;
  isStarter: boolean;
}

export const CourtPlayer: React.FC<CourtPlayerProps> = ({
  x,
  y,
  player,
  color,
  position,
  isStarter,
}) => {
  const hasPlayer = player.fullName.trim() && 
                   player.icPassport.trim() && 
                   player.email.trim() && 
                   player.phone.trim() && 
                   player.affiliation.trim();
  const initials = hasPlayer 
    ? player.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : position;

  return (
    <g>
      {/* Player circle */}
      <circle
        cx={x}
        cy={y}
        r={isStarter ? 8 : 6}
        fill={hasPlayer ? color : '#9CA3AF'}
        stroke="white"
        strokeWidth="1.5"
        className="transition-all duration-300 hover:scale-110"
      />
      
      {/* Player initials/position */}
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        className="fill-white text-xs font-medium pointer-events-none"
        fontSize={isStarter ? "8" : "6"}
      >
        {initials}
      </text>
      
      {/* Tooltip area (invisible) */}
      {hasPlayer && (
        <title>{`${player.fullName} - ${player.affiliation}`}</title>
      )}
    </g>
  );
};