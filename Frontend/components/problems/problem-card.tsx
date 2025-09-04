import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  solvedCount: number;
  acceptanceRate: number;
}

interface ProblemCardProps {
  problem: Problem;
}

const difficultyColors = {
  easy: 'text-gruvbox-green border-[var(--green)] bg-[var(--green)]/10',
  medium: 'text-gruvbox-yellow border-[var(--yellow)] bg-[var(--yellow)]/10',
  hard: 'text-gruvbox-red border-[var(--red)] bg-[var(--red)]/10',
};

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <Link 
                href={`/problems/${problem.slug}`}
                className="font-semibold hover:text-accent transition-colors"
              >
                {problem.title}
              </Link>
              <Badge className={cn('text-xs', difficultyColors[problem.difficulty])}>
                {problem.difficulty}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {problem.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs text-[var(--aqua)] bg-[var(--aqua)]/10 border-[var(--aqua)]/20">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted">
              <span>{problem.solvedCount.toLocaleString()} solved</span>
              <span>{problem.acceptanceRate}% acceptance</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/problems/${problem.slug}`}>
                View
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/problems/${problem.slug}?action=solve`}>
                Solve
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}