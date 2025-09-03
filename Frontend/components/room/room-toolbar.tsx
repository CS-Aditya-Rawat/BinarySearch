'use client';

import React, { useState } from 'react';
import { Play, Share, Copy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface RoomToolbarProps {
  onRun: () => void;
  isRunning: boolean;
  roomId: string;
}

export function RoomToolbar({ onRun, isRunning, roomId }: RoomToolbarProps) {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  
  const roomUrl = `${window.location.origin}/rooms/${roomId}`;

  const copyRoomUrl = async () => {
    try {
      await navigator.clipboard.writeText(roomUrl);
      toast.success('Room URL copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy Room ID');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={onRun}
        disabled={isRunning}
        size="sm"
        className="bg-success hover:bg-success/90"
      >
        <Play className="mr-2 h-4 w-4" />
        {isRunning ? 'Running...' : 'Run'}
      </Button>
      
      <Button variant="outline" size="sm">
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Others to Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="room-url">Room URL</Label>
              <div className="flex gap-2">
                <Input
                  id="room-url"
                  value={roomUrl}
                  readOnly
                  className="flex-1"
                />
                <Button onClick={copyRoomUrl} size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="room-id">Room ID</Label>
              <div className="flex gap-2">
                <Input
                  id="room-id"
                  value={roomId}
                  readOnly
                  className="flex-1"
                />
                <Button onClick={copyRoomId} size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}