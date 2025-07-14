import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Users, Building, CreditCard, FileText, ChevronUp, Eye } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";

interface Player {
  id: string;
  fullName: string;
  icPassport: string;
  email: string;
  phone: string;
  affiliation: string;
  relationshipType: string;
}

interface MobileCourtTrackerProps {
  players: Player[];
  teamName: string;
  company1: string;
  company2?: string;
  hasSecondCompany: boolean;
  paymentUploaded: boolean;
  isValidated: boolean;
}

export function MobileCourtTracker({
  players,
  teamName,
  company1,
  company2,
  hasSecondCompany,
  paymentUploaded,
  isValidated,
}: MobileCourtTrackerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Calculate progress
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

  return (
    <>
      {/* Mobile floating progress indicator */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              size="lg" 
              className="rounded-full w-16 h-16 bg-orange-600 hover:bg-orange-700 shadow-2xl"
            >
              <div className="flex flex-col items-center">
                <Eye className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">{progress.overallProgress}%</span>
              </div>
            </Button>
          </SheetTrigger>
          
          <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-orange-600" />
                  Team Progress
                </div>
                <Badge variant="outline" className="text-sm">
                  {progress.overallProgress}%
                </Badge>
              </SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-4">
              {/* Team Name */}
              <div className="text-center">
                <h3 className="font-semibold text-lg text-gray-900">
                  {teamName || "Team Name"}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{company1 || "Company 1"}</p>
                  {hasSecondCompany && (
                    <p>{company2 || "Company 2"}</p>
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
                <Progress value={progress.overallProgress} className="h-3" />
              </div>

              {/* Simplified Mobile Court View */}
              <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg p-4">
                <h4 className="font-medium text-sm text-gray-700 mb-3">Team Roster</h4>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {/* Starters */}
                  {[0, 1, 2, 3, 4].map(index => {
                    const player = players[index];
                    const isEmpty = !player?.fullName?.trim();
                    return (
                      <div 
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white
                          ${isEmpty 
                            ? "bg-gray-400" 
                            : player.affiliation === "company_1" 
                              ? "bg-blue-500" 
                              : "bg-green-500"}`}
                      >
                        {isEmpty ? "S" + (index + 1) : player.fullName.charAt(0).toUpperCase()}
                      </div>
                    );
                  })}
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {/* Bench */}
                  {[5, 6, 7, 8, 9].map(index => {
                    const player = players[index];
                    const isEmpty = !player?.fullName?.trim();
                    return (
                      <div 
                        key={index}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                          ${isEmpty 
                            ? "bg-gray-300" 
                            : player.affiliation === "company_1" 
                              ? "bg-blue-400" 
                              : "bg-green-400"}`}
                      >
                        {isEmpty ? "B" + (index - 4) : player.fullName.charAt(0).toUpperCase()}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-4 mt-4 text-xs">
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
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}