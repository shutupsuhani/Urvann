import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-8 ${className}`}>
      <div className="flex items-center space-x-2 text-red-600">
        <AlertCircle className="h-6 w-6" />
        <span className="font-medium">Error</span>
      </div>
      
      <p className="text-gray-600 text-center max-w-md">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;