'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Submission {
  id: string;
  problemTitle: string;
  language: string;
  status: 'queued' | 'running' | 'accepted' | 'wrong_answer' | 'time_limit' | 'memory_limit' | 'runtime_error';
  timestamp: Date;
  runtime?: number;
  memory?: number;
}

// Mock submissions data
const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: '1',
    problemTitle: 'Two Sum',
    language: 'Python',
    status: 'accepted',
    timestamp: new Date('2024-01-15T10:30:00'),
    runtime: 45,
    memory: 14.2,
  },
  {
    id: '2',
    problemTitle: 'Add Two Numbers',
    language: 'JavaScript',
    status: 'wrong_answer',
    timestamp: new Date('2024-01-15T09:15:00'),
  },
  {
    id: '3',
    problemTitle: 'Longest Substring',
    language: 'C++',
    status: 'running',
    timestamp: new Date('2024-01-15T09:10:00'),
  },
];

const statusConfig = {
  queued: { icon: Clock, label: 'Queued', color: 'text-muted' },
  running: { icon: Clock, label: 'Running', color: 'text-accent' },
  accepted: { icon: CheckCircle, label: 'Accepted', color: 'text-success' },
  wrong_answer: { icon: XCircle, label: 'Wrong Answer', color: 'text-error' },
  time_limit: { icon: AlertCircle, label: 'Time Limit Exceeded', color: 'text-warn' },
  memory_limit: { icon: AlertCircle, label: 'Memory Limit Exceeded', color: 'text-warn' },
  runtime_error: { icon: XCircle, label: 'Runtime Error', color: 'text-error' },
};

export function SubmissionsList() {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ['submissions'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_SUBMISSIONS;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!submissions?.length) {
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No submissions yet</h3>
            <p className="text-muted">Start solving problems to see your submission history here.</p>
          </div>
          <Button asChild>
            <Link href="/problems">Browse Problems</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => {
        const config = statusConfig[submission.status];
        const Icon = config.icon;

        return (
          <Card key={submission.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{submission.problemTitle}</h3>
                    <Badge variant="outline" className="text-xs">
                      {submission.language}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <span>{submission.timestamp.toLocaleString()}</span>
                    {submission.runtime && (
                      <span>{submission.runtime}ms</span>
                    )}
                    {submission.memory && (
                      <span>{submission.memory}MB</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={cn('flex items-center gap-2', config.color)}>
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{config.label}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}