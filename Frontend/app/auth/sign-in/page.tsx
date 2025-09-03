'use client';

import React from 'react';
import { AuthCard } from '@/components/auth/auth-card';
import { SignInForm } from '@/components/auth/sign-in-form';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthCard
        title="Sign in to CodeRooms"
        description="Enter your credentials to access your account"
      >
        <SignInForm />
      </AuthCard>
    </div>
  );
}