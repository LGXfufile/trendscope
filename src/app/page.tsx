'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Target, Brain, Clock } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { KeywordResults } from '@/components/KeywordResults';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeywordData, UserHistory } from '@/types';
import { searchAndAnalyzeKeywords, generateKeywordSuggestions } from '@/lib/googleTrends';

// Mock data for demonstration
const mockKeywords: KeywordData[] = [
  {
    id: '1',
    keyword: 'how to download',
    volume: 249000,
    difficulty: 'Medium',
    competition: 0.65,
    cpc: 1.23,
    trend: [100, 105, 98, 110, 120, 115, 125],
    searchIntent: 'Informational',
  },
  {
    id: '2',
    keyword: 'how to download google',
    volume: 61000,
    difficulty: 'Easy',
    competition: 0.45,
    cpc: 0.89,
    trend: [80, 85, 88, 92, 95, 88, 90],
    searchIntent: 'Informational',
  },
  {
    id: '3',
    keyword: 'how to download music',
    volume: 13000,
    difficulty: 'Hard',
    competition: 0.85,
    cpc: 2.15,
    trend: [60, 65, 70, 68, 72, 75, 78],
    searchIntent: 'Commercial',
  },
];

const recentSearches = [
  { id: '1', keyword: 'how to download', timestamp: new Date(), results: 1427 },
  { id: '2', keyword: 'ai generate', timestamp: new Date(Date.now() - 3600000), results: 892 },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchResults, setSearchResults] = useState<KeywordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<UserHistory[]>(recentSearches);
  const [suggestions, setSuggestions] = useState<string[]>([
    'how to download',
    'ai generate',
    'seo tools',
    'keyword research',
    'content strategy',
    'google trends',
    'marketing automation',
    'digital marketing'
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('darkMode') === 'true' || 
                    window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  }, [darkMode]);

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) return;
    
    setLoading(true);
    console.log(`🚀 开始基于 "${keyword}" 进行a-z关键词分析...`);
    
    try {
      // 使用新的a-z遍历搜索分析功能
      const analysisResult = await searchAndAnalyzeKeywords(keyword.trim());
      
      console.log(`📊 分析结果统计:
        - 主关键词: 1个
        - 相关关键词: ${analysisResult.relatedKeywords.length}个  
        - 总建议数: ${analysisResult.totalSuggestions}个`);
      
      // 合并所有结果
      const allResults = [analysisResult.mainKeyword, ...analysisResult.relatedKeywords];
      setSearchResults(allResults);
      
      // 更新搜索建议
      const newSuggestions = await generateKeywordSuggestions(keyword.trim());
      setSuggestions(newSuggestions);
      
      // 添加到搜索历史
      const newHistory: UserHistory = {
        id: Date.now().toString(),
        keyword: keyword.trim(),
        timestamp: new Date(),
        results: allResults.length,
      };
      setSearchHistory(prev => [newHistory, ...prev.slice(0, 4)]);
      
      console.log(`✅ 搜索完成! 共找到 ${allResults.length} 个关键词，基于 ${analysisResult.totalSuggestions} 个a-z建议生成`);
      
    } catch (error) {
      console.error('❌ 搜索分析失败:', error);
      
      // 失败时使用备用数据
      const backupResults = mockKeywords.filter(k => 
        k.keyword.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (backupResults.length === 0) {
        // 如果没有匹配的备用数据，创建一个基本结果
        const basicResult: KeywordData = {
          id: Date.now().toString(),
          keyword: keyword.trim(),
          volume: Math.floor(Math.random() * 50000) + 10000,
          difficulty: 'Medium',
          competition: Math.random() * 0.6 + 0.2,
          cpc: Math.random() * 2 + 1,
          trend: Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 30),
          searchIntent: 'Informational',
        };
        setSearchResults([basicResult]);
        console.log('⚠️ 使用备用基础结果');
      } else {
        setSearchResults(backupResults);
        console.log(`⚠️ 使用 ${backupResults.length} 个备用结果`);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center gap-2 mb-6">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-50 dark:bg-blue-950/20 rounded-full">
                    AI-Powered SEO Research
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-gray-100 dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                    The SEO Trend Tool
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    for Creators
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Discover niche opportunities with our AI-powered keyword trend dashboard 
                  designed for indie developers and content creators
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-2xl mx-auto"
              >
                <SearchBar 
                  onSearch={handleSearch} 
                  loading={loading}
                  suggestions={suggestions}
                />
              </motion.div>

              {searchHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Recent Searches
                    </h3>
                    <div className="space-y-2">
                      {searchHistory.slice(0, 2).map((search, index) => (
                        <motion.div
                          key={search.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-200/30 dark:border-gray-700/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-blue-600 dark:text-blue-400">
                              <TrendingUp className="h-4 w-4" />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {search.keyword}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {search.results} results
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <AnimatePresence>
          {(searchResults.length > 0 || loading) && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 px-4"
            >
              <div className="container mx-auto max-w-6xl">
                <KeywordResults 
                  results={searchResults}
                  loading={loading}
                  onSaveKeyword={(keyword) => console.log('Saved:', keyword)}
                />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Features Section */}
        {searchResults.length === 0 && !loading && (
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  Powerful Features for Modern Creators
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need to discover, analyze, and capitalize on trending keywords
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Brain,
                    title: 'AI-Powered Insights',
                    description: 'Get intelligent content suggestions and SEO strategies powered by advanced AI',
                    color: 'from-purple-500 to-pink-500'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Real-time Trends',
                    description: 'Access live Google Trends data and spot opportunities before your competition',
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    icon: Target,
                    title: 'Competition Analysis',
                    description: 'Analyze keyword difficulty and find low-competition, high-volume opportunities',
                    color: 'from-green-500 to-emerald-500'
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                      <CardHeader className="text-center pb-4">
                        <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
