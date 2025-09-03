'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProblemCard } from './problem-card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/fetcher';

interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  solvedCount: number;
  acceptanceRate: number;
}

interface ProblemListProps {
  filters: {
    search: string;
    difficulty: string;
    tags: string[];
    sort: string;
  };
}

// Mock data for demonstration
const MOCK_PROBLEMS: Problem[] = [
  {
    id: '1',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'easy',
    tags: ['Array', 'Hash Table'],
    solvedCount: 2580000,
    acceptanceRate: 49.1,
  },
  {
    id: '2',
    slug: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'medium',
    tags: ['Linked List', 'Math', 'Recursion'],
    solvedCount: 1890000,
    acceptanceRate: 35.4,
  },
  {
    id: '3',
    slug: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    solvedCount: 1650000,
    acceptanceRate: 33.8,
  },
  {
    id: '4',
    slug: 'median-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    solvedCount: 876000,
    acceptanceRate: 35.2,
  },
];

export function ProblemList({ filters }: ProblemListProps) {
  const { data: problems, isLoading, error } = useQuery({
    queryKey: ['problems', filters],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Apply filters to mock data
      let filtered = MOCK_PROBLEMS;
      
      if (filters.search) {
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.difficulty !== 'all') {
        filtered = filtered.filter(p => p.difficulty === filters.difficulty);
      }
      
      if (filters.tags.length > 0) {
        filtered = filtered.filter(p => 
          filters.tags.some(tag => p.tags.includes(tag))
        );
      }
      
      return filtered;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card p-6">
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">Failed to load problems. Please try again.</p>
      </div>
    );
  }

  if (!problems?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">No problems found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          {problems.length} problem{problems.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div className="space-y-3">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  );
}