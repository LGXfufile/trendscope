'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, TrendingUp, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  loading?: boolean;
  suggestions?: string[];
}

export function SearchBar({ onSearch, loading = false, suggestions = [] }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(keyword.length > 0)}
          placeholder="Enter a keyword to analyze trends..."
          className="h-16 text-lg pr-16 shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl"
          icon={<Search className="h-5 w-5" />}
        />
        <Button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="absolute right-2 top-2 h-12 px-6"
          size="default"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
          ) : (
            'Analyze'
          )}
        </Button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 w-full z-50"
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <CardContent className="p-2">
              {suggestions.slice(0, 8).map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 flex items-center gap-3"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{suggestion}</span>
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}