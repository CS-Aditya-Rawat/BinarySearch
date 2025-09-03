import React from 'react';
import { Terminal, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface RunResult {
  exit: number;
  stdout: string;
  stderr: string;
  timeMs: number;
  memoryKb: number;
}

interface RunPanelProps {
  result: RunResult | null;
  isRunning: boolean;
}

export function RunPanel({ result, isRunning }: RunPanelProps) {
  const getStatusIcon = () => {
    if (isRunning) return <Clock className="h-4 w-4 animate-spin" />;
    if (!result) return <Terminal className="h-4 w-4" />;
    return result.exit === 0 ? (
      <CheckCircle className="h-4 w-4 text-success" />
    ) : (
      <XCircle className="h-4 w-4 text-error" />
    );
  };

  const getStatusText = () => {
    if (isRunning) return 'Running...';
    if (!result) return 'Ready';
    return result.exit === 0 ? 'Success' : 'Error';
  };

  return (
    <div className="h-64 border-t border-default bg-elevated">
      <div className="h-full flex flex-col">
        <div className="px-4 py-2 border-b border-default">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="text-sm font-medium">{getStatusText()}</span>
            </div>
            {result && (
              <div className="flex items-center gap-4 text-xs text-muted">
                <span>{result.timeMs}ms</span>
                <span>{(result.memoryKb / 1024).toFixed(1)}MB</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {isRunning ? (
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : result ? (
            <div className="h-full flex flex-col">
              {result.stdout && (
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="text-xs text-muted mb-2">STDOUT:</div>
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {result.stdout}
                  </pre>
                </div>
              )}
              {result.stderr && (
                <div className="flex-1 p-4 overflow-y-auto border-t border-default">
                  <div className="text-xs text-error mb-2">STDERR:</div>
                  <pre className="text-sm font-mono whitespace-pre-wrap text-error">
                    {result.stderr}
                  </pre>
                </div>
              )}
              {!result.stdout && !result.stderr && (
                <div className="p-4 text-center text-muted">
                  No output
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-muted">
              Run your code to see output here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}