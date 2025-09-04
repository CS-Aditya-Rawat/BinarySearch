import React from 'react';
import Link from 'next/link';
import { Code2, ExternalLink } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[--bg-elev]">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 py-8 px-4 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-3">
          <div className="flex items-center space-x-2">
            <Code2 className="h-5 w-5 text-[--accent]" />
            <span className="font-bold text-base">CodeRooms</span>
          </div>
          <p className="text-center text-sm text-[--muted] md:text-left">
            Built for collaborative coding. Open source and free to use.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[--muted]">
          <Link 
            href="https://docs.coderooms.dev" 
            className="flex items-center space-x-1 hover:text-[--accent] transition-colors"
            target="_blank"
          >
            <span>Docs</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link 
            href="https://github.com/coderooms/platform" 
            className="flex items-center space-x-1 hover:text-[--accent] transition-colors"
            target="_blank"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link 
            href="/roadmap" 
            className="hover:text-[--accent] transition-colors"
          >
            Roadmap
          </Link>
          <Link 
            href="/license" 
            className="hover:text-[--accent] transition-colors"
          >
            License
          </Link>
        </div>
      </div>
    </footer>
  );
}