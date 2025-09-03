'use client';

import React from 'react';
import { RoomInterface } from '@/components/room/room-interface';

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default function RoomPage({ params }: RoomPageProps) {
  return <RoomInterface roomId={params.roomId} />;
}