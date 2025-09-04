'use client';

import React from 'react';
import Link from 'next/link';
import { Search, User, Settings, LogOut, Code2 } from 'lucide-react';
import { ThemeSwitcher } from '@/components/common/theme-switcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';

export function SiteHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[--bg]/95 backdrop-blur supports-[backdrop-filter]:bg-[--bg]/60">
      <div className="max-w-7xl mx-auto flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-[--accent]" />
            <span className="hidden font-bold text-lg sm:inline-block">CodeRooms</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/problems"
              className="transition-colors hover:text-[--accent] text-[--muted] hover:text-[--text]"
            >
              Problems
            </Link>
            <Link
              href="/rooms"
              className="transition-colors hover:text-[--accent] text-[--muted] hover:text-[--text]"
            >
              Rooms
            </Link>
            <Link
              href="/contests"
              className="transition-colors hover:text-[--accent] text-[--muted] hover:text-[--text]"
            >
              Contests
            </Link>
          </nav>
        </div>

        {/* Mobile logo */}
        <div className="flex md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-[--accent]" />
            <span className="font-bold text-lg">CodeRooms</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-3 ml-4">
          <div className="hidden sm:flex w-auto flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[--muted]" />
              <Input
                type="search"
                placeholder="Search problems..."
                className="w-[200px] lg:w-[300px] pl-8 h-9"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeSwitcher />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.username}</p>
                      <p className="text-xs leading-none text-muted">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${user.username}`}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/submissions">
                      <Code2 className="mr-2 h-4 w-4" />
                      Submissions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/sign-in">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/sign-up">Sign up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}