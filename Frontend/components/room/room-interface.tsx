'use client';

import React, { useState, useEffect } from 'react';
import { EditorPane } from './editor-pane';
import { ChatPane } from './chat-pane';
import { ParticipantsPane } from './participants-pane';
import { RunPanel } from './run-panel';
import { RoomToolbar } from './room-toolbar';
import { useWebSocket } from '@/hooks/use-websocket';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RoomInterfaceProps {
  roomId: string;
}

interface Participant {
  id: string;
  username: string;
  avatar?: string;
  isHost: boolean;
  cursor?: { line: number; column: number };
}

interface ChatMessage {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
}

export function RoomInterface({ roomId }: RoomInterfaceProps) {
  const { user } = useAuth();
  const [code, setCode] = useState('# Welcome to CodeRooms!\n# Start coding here...\n');
  const [language, setLanguage] = useState('python');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [runResult, setRunResult] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const { isConnected, isReconnecting, sendMessage } = useWebSocket(
    `ws://localhost:8000/ws/rooms/${roomId}`,
    {
      onMessage: (message) => {
        switch (message.type) {
          case 'CODE_SYNC':
            setCode(message.payload.source);
            setLanguage(message.payload.lang);
            break;
          case 'CHAT':
            setChatMessages(prev => [...prev, {
              id: Date.now().toString(),
              text: message.payload.text,
              user: message.payload.user,
              timestamp: new Date(message.payload.ts),
            }]);
            break;
          case 'PRESENCE':
            setParticipants(message.payload.participants || []);
            break;
          case 'RUN_STATUS':
            setIsRunning(message.payload.status === 'running');
            break;
          case 'RUN_RESULT':
            setRunResult(message.payload);
            setIsRunning(false);
            break;
        }
      },
      onConnect: () => {
        console.log('Connected to room:', roomId);
      },
      onDisconnect: () => {
        console.log('Disconnected from room:', roomId);
      },
    }
  );

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    sendMessage({
      type: 'CODE_EDIT',
      payload: {
        source: newCode,
        lang: language,
        cursor: { line: 1, column: 1 }, // Would get from Monaco editor
      },
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    sendMessage({
      type: 'CODE_EDIT',
      payload: {
        source: code,
        lang: newLanguage,
        cursor: { line: 1, column: 1 },
      },
    });
  };

  const handleSendChat = (text: string) => {
    sendMessage({
      type: 'CHAT',
      payload: { text },
    });
  };

  const handleRunCode = () => {
    setIsRunning(true);
    sendMessage({
      type: 'RUN',
      payload: {
        lang: language,
        source: code,
        problemId: 'two-sum', // Would be dynamic
      },
    });
  };

  // Connection status indicator
  const connectionStatus = isReconnecting ? 'reconnecting' : isConnected ? 'connected' : 'disconnected';

  return (
    <div className="h-screen flex flex-col">
      {/* Room Header */}
      <div className="border-b border-default bg-elevated px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold">Room: {roomId}</h1>
            <Badge variant={isConnected ? 'default' : 'secondary'}>
              {connectionStatus}
            </Badge>
            {participants.length > 0 && (
              <Badge variant="outline">
                {participants.length} participant{participants.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <RoomToolbar
            onRun={handleRunCode}
            isRunning={isRunning}
            roomId={roomId}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <EditorPane
            code={code}
            language={language}
            onChange={handleCodeChange}
            onLanguageChange={handleLanguageChange}
            participants={participants}
          />
          <RunPanel result={runResult} isRunning={isRunning} />
        </div>

        {/* Right Panel - Chat & Participants */}
        <div className="w-80 border-l border-default flex flex-col">
          <ParticipantsPane participants={participants} />
          <ChatPane
            messages={chatMessages}
            onSendMessage={handleSendChat}
            currentUser={user?.username || 'Anonymous'}
          />
        </div>
      </div>
    </div>
  );
}