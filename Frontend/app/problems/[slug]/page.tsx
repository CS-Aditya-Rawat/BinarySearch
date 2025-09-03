import React from 'react';
import { Container } from '@/components/common/container';
import { ProblemDetail } from '@/components/problems/problem-detail';

interface ProblemPageProps {
  params: {
    slug: string;
  };
}

export default function ProblemPage({ params }: ProblemPageProps) {
  return (
    <div className="py-8">
      <Container>
        <ProblemDetail slug={params.slug} />
      </Container>
    </div>
  );
}