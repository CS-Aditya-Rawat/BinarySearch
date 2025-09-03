'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Users, Clock } from 'lucide-react';
import { Container } from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock rooms data
const MOCK_ROOMS = [
  {
    id: 'room-1',
    name: 'Two Sum Practice',
    problem: 'Two Sum',
    participantCount: 3,
    maxParticipants: 8,
    language: 'Python',
    createdAt: new Date('2024-01-15T10:30:00'),
    isActive: true,
  },
  {
    id: 'room-2',
    name: 'Algorithm Study Group',
    problem: 'Longest Substring Without Repeating Characters',
    participantCount: 5,
    maxParticipants: 10,
    language: 'JavaScript',
    createdAt: new Date('2024-01-15T09:15:00'),
    isActive: true,
  },
  {
    id: 'room-3',
    name: 'Interview Prep Session',
    problem: 'Median of Two Sorted Arrays',
    participantCount: 2,
    maxParticipants: 6,
    language: 'C++',
    createdAt: new Date('2024-01-15T08:45:00'),
    isActive: false,
  },
];

export default function RoomsPage() {
  return (
    <div className="py-8">
      <Container>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Coding Rooms</h1>
              <p className="text-muted">
                Join existing rooms or create your own collaborative coding session.
              </p>
            </div>
            <Button asChild>
              <Link href="/rooms/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Room
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_ROOMS.map((room) => (
              <Card key={room.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>{room.problem}</span>
                        <Badge variant="outline" className="text-xs">
                          {room.language}
                        </Badge>
                      </CardDescription>
                    </div>
                    <Badge variant={room.isActive ? 'default' : 'secondary'}>
                      {room.isActive ? 'Active' : 'Ended'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted">
                      <Users className="h-4 w-4" />
                      <span>{room.participantCount}/{room.maxParticipants}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted">
                      <Clock className="h-4 w-4" />
                      <span>{room.createdAt.toLocaleTimeString()}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={room.isActive ? 'default' : 'outline'}
                    disabled={!room.isActive || room.participantCount >= room.maxParticipants}
                    asChild
                  >
                    <Link href={`/rooms/${room.id}`}>
                      {room.isActive ? 'Join Room' : 'View Results'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {MOCK_ROOMS.length === 0 && (
            <div className="text-center py-12">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">No rooms yet</h3>
                  <p className="text-muted">Create your first coding room to get started.</p>
                </div>
                <Button asChild>
                  <Link href="/rooms/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Room
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}