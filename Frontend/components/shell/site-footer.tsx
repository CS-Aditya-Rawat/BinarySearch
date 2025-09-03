import React from 'react';
import Link from 'next/link';
import { Code2, ExternalLink } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-default bg-elevated">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Code2 className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted md:text-left">
            Built for collaborative coding. Open source and free to use.
          </p>
        </div>
        <div className="flex items-center space-x-6 text-sm text-muted">
          <Link 
            href="https://docs.coderooms.dev" 
            className="flex items-center space-x-1 hover:text-accent transition-colors"
            target="_blank"
          >
            <span>Docs</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link 
            href="https://github.com/coderooms/platform" 
            className="flex items-center space-x-1 hover:text-accent transition-colors"
            target="_blank"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link 
            href="/roadmap" 
            className="hover:text-accent transition-colors"
          >
            Roadmap
          </Link>
          <Link 
            href="/license" 
            className="hover:text-accent transition-colors"
          >
            License
          </Link>
        </div>
      </div>
    </footer>
  );
}