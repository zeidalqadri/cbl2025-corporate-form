import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressIndicatorProps {
  label: string;
  complete: boolean;
  description: string;
  progress?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  label,
  complete,
  description,
  progress,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {complete ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <Circle className="w-4 h-4 text-muted-foreground" />
          )}
          <span className={`text-sm font-medium ${complete ? 'text-green-700 dark:text-green-400' : 'text-foreground'}`}>
            {label}
          </span>
        </div>
        {progress !== undefined && (
          <span className="text-xs text-muted-foreground">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      
      {progress !== undefined && (
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
      
      <p className="text-xs text-muted-foreground pl-6">
        {description}
      </p>
    </div>
  );
};