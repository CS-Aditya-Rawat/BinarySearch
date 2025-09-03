import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Code, Zap, Trophy } from 'lucide-react';
import { Container } from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Code Together,{' '}
                <span className="text-accent">Learn Faster</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted">
                Practice coding problems in real-time collaborative rooms. 
                Get instant feedback, learn from others, and level up your skills together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/problems">
                  Start Solving
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/rooms">Create Room</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-elevated">
        <Container>
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Everything you need to master coding
              </h2>
              <p className="mx-auto max-w-[600px] text-muted">
                From algorithm practice to interview prep, we've got you covered.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <CardTitle>Real-Time Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Code together with friends or strangers. See changes instantly as you type.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <Code className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <CardTitle>Multiple Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Support for Python, JavaScript, C++, and more. Choose your preferred language.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <Zap className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <CardTitle>Instant Execution</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Run your code instantly and see results in real-time. Debug together effectively.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <CardTitle>Track Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Monitor your solving streaks, submission history, and coding achievements.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to start coding?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted">
                Join thousands of developers improving their skills through collaborative problem solving.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}