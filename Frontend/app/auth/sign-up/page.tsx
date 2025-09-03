'use client';

import React from 'react';
import { AuthCard } from '@/components/auth/auth-card';
import { SignUpForm } from '@/components/auth/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthCard
        title="Create your account"
        description="Join CodeRooms to start collaborative coding"
      >
        <SignUpForm />
      </AuthCard>
    </div>
  );
}