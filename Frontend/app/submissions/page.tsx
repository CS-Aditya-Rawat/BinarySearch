'use client';

import React from 'react';
import { Container } from '@/components/common/container';
import { SubmissionsList } from '@/components/submissions/submissions-list';

export default function SubmissionsPage() {
  return (
    <div className="py-8">
      <Container>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
            <p className="text-muted">
              Track your submission history and view detailed results.
            </p>
          </div>
          
          <SubmissionsList />
        </div>
      </Container>
    </div>
  );
}