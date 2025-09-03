'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProblemFiltersProps {
  filters: {
    search: string;
    difficulty: string;
    tags: string[];
    sort: string;
  };
  onFiltersChange: (filters: any) => void;
}

const AVAILABLE_TAGS = [
  'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math',
  'Sorting', 'Greedy', 'Depth-First Search', 'Binary Search', 'Tree',
  'Breadth-First Search', 'Two Pointers', 'Stack', 'Heap', 'Graph'
];

export function ProblemFilters({ filters, onFiltersChange }: ProblemFiltersProps) {
  const updateFilters = (updates: Partial<typeof filters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const handleTagToggle = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...filters.tags, tag]
      : filters.tags.filter(t => t !== tag);
    updateFilters({ tags: newTags });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
          <Input
            id="search"
            placeholder="Search problems..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-8"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Difficulty</Label>
        <RadioGroup
          value={filters.difficulty}
          onValueChange={(value) => updateFilters({ difficulty: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="easy" id="easy" />
            <Label htmlFor="easy" className="text-success">Easy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="text-warn">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hard" id="hard" />
            <Label htmlFor="hard" className="text-error">Hard</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Sort by</Label>
        <Select value={filters.sort} onValueChange={(value) => updateFilters({ sort: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Tags ({filters.tags.length} selected)</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {AVAILABLE_TAGS.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={tag}
                checked={filters.tags.includes(tag)}
                onCheckedChange={(checked) => handleTagToggle(tag, checked as boolean)}
              />
              <Label htmlFor={tag} className="text-sm">{tag}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}