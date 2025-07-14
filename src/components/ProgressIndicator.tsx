import React from "react";
import { CheckCircle, XCircle, AlertCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  icon: React.ReactNode;
  title: string;
  status: "complete" | "partial" | "incomplete";
  active?: boolean;
  onClick?: () => void;
}

export function ProgressIndicator({ 
  icon, 
  title, 
  status, 
  active = false, 
  onClick 
}: ProgressIndicatorProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "partial":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "incomplete":
        return <XCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "complete":
        return "text-green-700 bg-green-50 border-green-200";
      case "partial":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "incomplete":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border transition-all duration-200",
        getStatusColor(),
        active && "ring-2 ring-orange-200 ring-offset-1",
        onClick && "cursor-pointer hover:shadow-sm"
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 opacity-70">
          {icon}
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      
      <div className="flex-shrink-0">
        {getStatusIcon()}
      </div>
    </div>
  );
}