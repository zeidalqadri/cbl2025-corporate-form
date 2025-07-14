import * as React from "react";

interface Player {
  id: string;
  fullName: string;
  icPassport: string;
  email: string;
  phone: string;
  affiliation: string;
  relationshipType: string;
}

interface Position {
  x: number;
  y: number;
  label: string;
  type: "starter" | "bench";
}

interface CourtPlayerProps {
  position: Position;
  player?: Player;
  color: "primary" | "secondary" | "accent" | "gray" | "highlight";
  onClick?: () => void;
}

export const CourtPlayer = React.memo(function CourtPlayer({ position, player, color, onClick }: CourtPlayerProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Get color scheme based on color prop
  const getColors = () => {
    switch (color) {
      case "primary":
        return {
          fill: "#3b82f6", // blue-500
          stroke: "#1d4ed8", // blue-700
          text: "#ffffff",
          hover: "#2563eb", // blue-600
        };
      case "secondary":
        return {
          fill: "#10b981", // green-500
          stroke: "#047857", // green-700
          text: "#ffffff",
          hover: "#059669", // green-600
        };
      case "accent":
        return {
          fill: "#f59e0b", // amber-500
          stroke: "#d97706", // amber-600
          text: "#ffffff",
          hover: "#f59e0b", // amber-500
        };
      case "highlight":
        return {
          fill: "#ef4444", // red-500 - highlighted for missing minimum players
          stroke: "#dc2626", // red-600
          text: "#ffffff",
          hover: "#f87171", // red-400
        };
      case "gray":
      default:
        return {
          fill: "#9ca3af", // gray-400
          stroke: "#6b7280", // gray-500
          text: "#ffffff",
          hover: "#6b7280", // gray-500
        };
    }
  };

  const colors = getColors();
  const displayFill = isHovered ? colors.hover : colors.fill;
  const isEmpty = !player?.fullName?.trim();

  // Get player initials
  const getInitials = () => {
    if (!player?.fullName?.trim()) return position.label;
    
    const names = player.fullName.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Create tooltip content
  const getTooltipContent = () => {
    if (!player?.fullName?.trim()) {
      return `${position.label} - Empty Position`;
    }
    
    return `${player.fullName}\n${player.relationshipType}\n${player.email}`;
  };

  return (
    <g
      className={`transition-all duration-200 ${onClick ? "cursor-pointer" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? "button" : "presentation"}
      aria-label={onClick ? `Click to scroll to ${player?.fullName || position.label} form` : undefined}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Player circle */}
      <circle
        cx={position.x}
        cy={position.y}
        r={isEmpty ? "3" : "4"}
        fill={displayFill}
        stroke={colors.stroke}
        strokeWidth="0.5"
        className={`transition-all duration-300 ease-in-out ${
          isEmpty ? "opacity-60" : "opacity-100"
        }`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          animation: isEmpty ? "none" : "player-pulse 2s ease-in-out infinite"
        }}
      />
      
      {/* Player appearance animation */}
      {!isEmpty && (
        <circle
          cx={position.x}
          cy={position.y}
          r="6"
          fill="none"
          stroke={colors.fill}
          strokeWidth="0.3"
          className="opacity-30"
          style={{
            animation: "ripple 1.5s ease-out infinite"
          }}
        />
      )}
      
      {/* Player initials/label */}
      <text
        x={position.x}
        y={position.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`fill-current text-[3px] font-bold ${
          isEmpty ? "opacity-60" : "opacity-100"
        }`}
        fill={colors.text}
      >
        {getInitials()}
      </text>
      
      {/* Hover indicator */}
      {isHovered && (
        <circle
          cx={position.x}
          cy={position.y}
          r="6"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="0.5"
          strokeDasharray="1,1"
          className="opacity-50"
        />
      )}
      
      {/* Position type indicator */}
      {position.type === "starter" && (
        <circle
          cx={position.x + 2}
          cy={position.y - 2}
          r="1"
          fill="#f59e0b"
          className="opacity-80"
        />
      )}

      {/* Tooltip (simple title for now) */}
      <title>{getTooltipContent()}</title>
    </g>
  );
});