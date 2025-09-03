'use client';

import React, { useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface EditorPaneProps {
  code: string;
  language: string;
  onChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  participants: any[];
}

const SUPPORTED_LANGUAGES = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
];

export function EditorPane({ 
  code, 
  language, 
  onChange, 
  onLanguageChange,
  participants 
}: EditorPaneProps) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
      lineHeight: 1.5,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      renderWhitespace: 'selection',
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      wordWrap: 'on',
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Editor Header */}
      <div className="border-b border-default bg-elevated px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="language" className="text-sm font-medium">
                Language:
              </Label>
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {participants.slice(0, 3).map((participant, index) => (
              <div
                key={participant.id}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: `hsl(${index * 120}, 70%, 50%)` }}
                title={participant.username}
              />
            ))}
            {participants.length > 3 && (
              <span className="text-xs text-muted">+{participants.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            automaticLayout: true,
            contextmenu: true,
            copyWithSyntaxHighlighting: true,
          }}
        />
      </div>
    </div>
  );
}