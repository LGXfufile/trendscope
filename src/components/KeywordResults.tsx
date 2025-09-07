'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ExternalLink, Bookmark, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KeywordData } from '@/types';
import { formatNumber, getDifficultyColor } from '@/lib/utils';

interface KeywordResultsProps {
  results: KeywordData[];
  loading?: boolean;
  onSaveKeyword?: (keyword: KeywordData) => void;
}

export function KeywordResults({ results, loading = false, onSaveKeyword }: KeywordResultsProps) {
  if (loading) {
    return (
      <div className="w-full space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No results found
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Try searching for a different keyword or phrase
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Keyword Analysis Results
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formatNumber(results.length)} keywords found
        </p>
      </div>

      {results.map((keyword, index) => (
        <motion.div
          key={keyword.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{keyword.keyword}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                    {keyword.difficulty}
                  </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(keyword.volume)}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Volume/Day</p>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {formatNumber(keyword.volume)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Competition</p>
                  <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">
                    {Math.round(keyword.competition * 100)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">CPC</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    ${keyword.cpc.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Intent</p>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {keyword.searchIntent}
                  </p>
                </div>
              </div>

              {/* Trend visualization */}
              <div className="mb-6">
                <div className="h-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4 flex items-center">
                  <div className="flex items-center gap-2 w-full">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">7-day trend:</span>
                    <div className="flex-1 h-8 flex items-end gap-1 ml-4">
                      {keyword.trend.map((value, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${(value / Math.max(...keyword.trend)) * 100}%` }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="bg-blue-500 rounded-sm min-h-[2px] flex-1"
                          style={{ maxHeight: '32px' }}
                        />
                      ))}
                    </div>
                    <span className={`text-sm font-medium ${
                      keyword.trend[keyword.trend.length - 1] > keyword.trend[0] 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {keyword.trend[keyword.trend.length - 1] > keyword.trend[0] ? '↗' : '↘'}
                      {Math.abs(
                        ((keyword.trend[keyword.trend.length - 1] - keyword.trend[0]) / keyword.trend[0] * 100)
                      ).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Trending {keyword.trend[keyword.trend.length - 1] > keyword.trend[0] ? '↗' : '↘'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSaveKeyword?.(keyword)}
                    className="h-8 px-3"
                  >
                    <Bookmark className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(
                      `https://trends.google.com/trends/explore?date=now%207-d&geo=US&q=${encodeURIComponent(keyword.keyword)}`,
                      '_blank'
                    )}
                    className="h-8 px-3"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Google Trends
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}