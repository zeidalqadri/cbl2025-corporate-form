import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CourtPlayer } from "./CourtPlayer";
import { ProgressIndicator } from "./ProgressIndicator";
import { Users, Building, CreditCard, FileText } from "lucide-react";

interface Player {
  id: string;
  fullName: string;
  icPassport: string;
  email: string;
  phone: string;
  affiliation: string; // company_1 or company_2
  relationshipType: string;
}

interface BasketballCourtTrackerProps {
  players: Player[];
  teamName: string;
  company1: string;
  company2?: string;
  hasSecondCompany: boolean;
  paymentUploaded: boolean;
  isValidated: boolean;
  onPlayerClick?: (playerId: string) => void;
}

interface Position {
  x: number;
  y: number;
  label: string;
  type: "starter" | "bench";
}

export const BasketballCourtTracker = React.memo(function BasketballCourtTracker({
  players,
  teamName,
  company1,
  company2,
  hasSecondCompany,
  paymentUploaded,
  isValidated,
  onPlayerClick,
}: BasketballCourtTrackerProps) {
  // Memoize court positions for performance
  const positions: Position[] = React.useMemo(() => [
    // Starters (on court)
    { x: 50, y: 85, label: "PG", type: "starter" }, // Point Guard
    { x: 25, y: 70, label: "SG", type: "starter" }, // Shooting Guard
    { x: 75, y: 70, label: "SF", type: "starter" }, // Small Forward
    { x: 35, y: 50, label: "PF", type: "starter" }, // Power Forward
    { x: 50, y: 35, label: "C", type: "starter" }, // Center
    
    // Bench players (off court)
    { x: 15, y: 25, label: "B1", type: "bench" },
    { x: 25, y: 25, label: "B2", type: "bench" },
    { x: 35, y: 25, label: "B3", type: "bench" },
    { x: 45, y: 25, label: "B4", type: "bench" },
    { x: 55, y: 25, label: "B5", type: "bench" },
    { x: 65, y: 25, label: "B6", type: "bench" },
    { x: 75, y: 25, label: "B7", type: "bench" },
    { x: 85, y: 25, label: "B8", type: "bench" },
    { x: 15, y: 15, label: "B9", type: "bench" },
    { x: 85, y: 15, label: "B10", type: "bench" },
  ], []);

  // Calculate progress and validation
  const progress = React.useMemo(() => {
    const teamInfoComplete = teamName.trim() && company1.trim() && (!hasSecondCompany || company2?.trim());
    const playerCount = players.filter(p => p.fullName.trim()).length;
    const playersComplete = players.length > 0 && players.every(p => 
      !p.fullName.trim() || (p.fullName.trim() && p.icPassport.trim() && p.email.trim() && p.phone.trim() && p.affiliation && p.relationshipType)
    );
    const hasMinimumPlayers = playerCount >= 5;
    
    return {
      teamInfo: teamInfoComplete,
      playerCount,
      playersComplete,
      hasMinimumPlayers,
      paymentUploaded,
      isValidated,
      overallProgress: Math.round(
        ((teamInfoComplete ? 25 : 0) + 
         (hasMinimumPlayers ? 25 : 0) + 
         (playersComplete ? 25 : 0) + 
         (paymentUploaded ? 15 : 0) +
         (isValidated ? 10 : 0)) 
      )
    };
  }, [teamName, company1, company2, hasSecondCompany, players, paymentUploaded, isValidated]);

  // Memoized function to assign colors based on company affiliation
  const getPlayerColor = React.useCallback((player: Player) => {
    if (!player.fullName.trim()) return "gray";
    
    switch (player.affiliation) {
      case "company_1":
        return "primary";
      case "company_2":
        return "secondary";
      default:
        return "accent";
    }
  }, []);

  return (
    <div 
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 w-80 max-h-[90vh] overflow-y-auto
                 md:block hidden lg:w-80 xl:w-96"
      role="complementary"
      aria-label="Team registration progress tracker"
    >
      <Card className="basketball-court-tracker shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-600" />
              Team Progress
            </div>
            <Badge variant="outline" className="text-sm">
              {progress.overallProgress}%
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Team Name */}
          <div className="text-center">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {teamName || "Team Name"}
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="truncate">{company1 || "Company 1"}</p>
              {hasSecondCompany && (
                <p className="truncate">{company2 || "Company 2"}</p>
              )}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="space-y-2">
            <ProgressIndicator
              icon={<Building className="w-4 h-4" />}
              title="Team Info"
              status={progress.teamInfo ? "complete" : "incomplete"}
            />
            
            <ProgressIndicator
              icon={<Users className="w-4 h-4" />}
              title={`Players (${progress.playerCount}/15) - Min 5`}
              status={progress.hasMinimumPlayers ? (progress.playersComplete ? "complete" : "partial") : "incomplete"}
            />
            
            <ProgressIndicator
              icon={<CreditCard className="w-4 h-4" />}
              title="Payment"
              status={progress.paymentUploaded ? "complete" : "incomplete"}
            />

            <ProgressIndicator
              icon={<FileText className="w-4 h-4" />}
              title="Validation"
              status={progress.isValidated ? "complete" : "incomplete"}
            />
          </div>

          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium">{progress.overallProgress}%</span>
            </div>
            <Progress 
              value={progress.overallProgress} 
              className="h-2" 
              aria-label={`Overall registration progress: ${progress.overallProgress}% complete`}
            />
          </div>

          {/* Basketball Court */}
          <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="relative">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-48 bg-orange-200 rounded-lg border-2 border-orange-300"
                role="img"
                aria-label={`Basketball court visualization showing ${progress.playerCount} players out of 15 positions filled`}
              >
                {/* Court outline */}
                <rect x="5" y="5" width="90" height="90" fill="none" stroke="#f97316" strokeWidth="0.5" />
                
                {/* Center circle */}
                <circle cx="50" cy="50" r="8" fill="none" stroke="#f97316" strokeWidth="0.5" />
                
                {/* Three-point line (simplified arc) */}
                <path
                  d="M 15 80 Q 50 60 85 80"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="0.5"
                />
                
                {/* Free throw line */}
                <rect x="35" y="80" width="30" height="15" fill="none" stroke="#f97316" strokeWidth="0.5" />
                
                {/* Key (paint) */}
                <rect x="40" y="40" width="20" height="40" fill="rgba(249, 115, 22, 0.1)" stroke="#f97316" strokeWidth="0.5" />
                
                {/* Basket */}
                <circle cx="50" cy="88" r="1" fill="#f97316" />
                
                {/* Bench area */}
                <rect x="10" y="10" width="80" height="15" fill="rgba(107, 114, 128, 0.1)" stroke="#6b7280" strokeWidth="0.5" strokeDasharray="1,1" />
                
                {/* Player positions */}
                {positions.map((position, index) => {
                  const player = players[index];
                  const isEssential = index < 5; // First 5 are starters (essential positions)
                  const needsHighlight = !progress.hasMinimumPlayers && isEssential;
                  
                  return (
                    <CourtPlayer
                      key={index}
                      position={position}
                      player={player}
                      color={player ? getPlayerColor(player) : (needsHighlight ? "highlight" : "gray")}
                      onClick={() => player && onPlayerClick?.(player.id)}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span>{company1 || "Company 1"}</span>
            </div>
            {hasSecondCompany && (
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>{company2 || "Company 2"}</span>
              </div>
            )}
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
              <span>Empty</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});