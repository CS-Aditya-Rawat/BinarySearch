'use client';

import React, { useState } from 'react';
import { Container } from '@/components/common/container';
import { ProblemList } from '@/components/problems/problem-list';
import { ProblemFilters } from '@/components/problems/problem-filters';

export default function ProblemsPage() {
  const [filters, setFilters] = useState({
    search: '',
    difficulty: 'all',
    tags: [] as string[],
    sort: 'newest',
  });

  return (
    <div className="py-8">
      <Container>
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
            <p className="text-muted">
              Practice coding problems individually or solve them together in collaborative rooms.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <ProblemFilters filters={filters} onFiltersChange={setFilters} />
            </aside>
            
            <main className="flex-1">
              <ProblemList filters={filters} />
            </main>
          </div>
        </div>
      </Container>
    </div>
  );
}