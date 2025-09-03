import React from 'react';
import { Crown, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Participant {
  id: string;
  username: string;
  avatar?: string;
  isHost: boolean;
  cursor?: { line: number; column: number };
}

interface ParticipantsPaneProps {
  participants: Participant[];
}

export function ParticipantsPane({ participants }: ParticipantsPaneProps) {
  return (
    <div className="border-b border-default">
      <div className="px-4 py-3 border-b border-default bg-elevated">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <User className="h-4 w-4" />
          Participants ({participants.length})
        </h3>
      </div>
      
      <div className="p-4 space-y-3">
        {participants.length === 0 ? (
          <div className="text-center text-muted text-sm py-4">
            Waiting for participants to join...
          </div>
        ) : (
          participants.map((participant) => (
            <div key={participant.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={participant.avatar} alt={participant.username} />
                <AvatarFallback className="text-xs">
                  {participant.username[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">
                    {participant.username}
                  </span>
                  {participant.isHost && (
                    <Crown className="h-3 w-3 text-accent" />
                  )}
                </div>
                {participant.cursor && (
                  <div className="text-xs text-muted">
                    Line {participant.cursor.line}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}