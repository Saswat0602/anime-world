import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  className?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  className = '',
  icon,
  action
}) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[200px] p-6 ${className}`}>
      <div className="flex flex-col items-center gap-4 text-center">
        {icon || <AlertCircle className="w-12 h-12 text-destructive" />}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Error</h3>
          <p className="text-muted-foreground">{message}</p>
        </div>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
};

export default ErrorDisplay; 