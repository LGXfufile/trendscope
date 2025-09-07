export interface KeywordData {
  id: string;
  keyword: string;
  volume: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  competition: number;
  cpc: number;
  trend: number[];
  relatedKeywords?: string[];
  searchIntent: 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
  seasonality?: {
    month: string;
    value: number;
  }[];
}

export interface TrendData {
  date: string;
  value: number;
}

export interface SearchResult {
  keywords: KeywordData[];
  totalResults: number;
  searchTime: number;
  suggestions: string[];
}

export interface UserHistory {
  id: string;
  keyword: string;
  timestamp: Date;
  results: number;
}

export interface SavedKeyword {
  id: string;
  keyword: string;
  volume: number;
  savedAt: Date;
  tags?: string[];
}

export interface ContentSuggestion {
  title: string;
  outline: string[];
  targetKeywords: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedLength: string;
  contentType: 'Blog Post' | 'Tutorial' | 'Guide' | 'Review' | 'Comparison';
}