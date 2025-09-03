'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';

interface ProblemDetailProps {
  slug: string;
}

// Mock problem data
const MOCK_PROBLEM = {
  id: '1',
  slug: 'two-sum',
  title: 'Two Sum',
  difficulty: 'easy' as const,
  tags: ['Array', 'Hash Table'],
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: '',
    },
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.',
  ],
  solvedCount: 2580000,
  acceptanceRate: 49.1,
};

const difficultyColors = {
  easy: 'bg-success text-white',
  medium: 'bg-warn text-black',
  hard: 'bg-error text-white',
};

export function ProblemDetail({ slug }: ProblemDetailProps) {
  const { data: problem, isLoading } = useQuery({
    queryKey: ['problem', slug],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_PROBLEM;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">Problem not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/problems">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Problems
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="description" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="editorial">Editorial</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="description" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{problem.title}</h1>
                  <Badge className={cn('text-xs', difficultyColors[problem.difficulty])}>
                    {problem.difficulty}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {problem.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>{problem.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Examples */}
              <Card>
                <CardHeader>
                  <CardTitle>Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">Example {index + 1}:</h4>
                      <div className="space-y-1">
                        <div className="bg-elevated p-3 rounded font-mono text-sm">
                          <strong>Input:</strong> {example.input}
                        </div>
                        <div className="bg-elevated p-3 rounded font-mono text-sm">
                          <strong>Output:</strong> {example.output}
                        </div>
                        {example.explanation && (
                          <div className="text-sm text-muted">
                            <strong>Explanation:</strong> {example.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Constraints */}
              <Card>
                <CardHeader>
                  <CardTitle>Constraints</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="font-mono">{constraint}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="editorial">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted">Editorial content coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted">Your submissions will appear here after you solve the problem.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Solved</span>
                  <span>{problem.solvedCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Acceptance</span>
                  <span>{problem.acceptanceRate}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href={`/rooms/new?problem=${problem.slug}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Solve in Room
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/rooms/join?problem=${problem.slug}`}>
                    <Users className="mr-2 h-4 w-4" />
                    Join Room
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}