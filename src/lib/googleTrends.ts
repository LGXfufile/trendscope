import googleTrends from 'google-trends-api';
import { KeywordData } from '@/types';

// 生成a-z遍历的关键词建议（模拟Google搜索下拉框）
export async function generateAlphabetSuggestions(seedKeyword: string): Promise<string[]> {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const suggestions: string[] = [];
  
  // 为每个字母生成建议词
  for (const letter of alphabet) {
    // 生成不同的组合模式
    const patterns = [
      `${seedKeyword} ${letter}`,
      `${seedKeyword} a${letter}`,
      `${seedKeyword} ${letter}a`,
      `how to ${seedKeyword} ${letter}`,
      `${seedKeyword} for ${letter}`,
      `best ${seedKeyword} ${letter}`,
    ];
    
    patterns.forEach(pattern => {
      suggestions.push(pattern);
    });
  }
  
  // 随机打乱并返回前50个建议
  const shuffled = suggestions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 50);
}

// 获取Google搜索自动完成建议（模拟）
export async function getGoogleAutoComplete(keyword: string): Promise<string[]> {
  // 这里模拟Google搜索的自动完成API
  // 实际项目中可能需要使用puppeteer或其他方式获取真实的自动完成数据
  
  const commonSuffixes = [
    'tutorial', 'guide', 'tips', 'free', 'online', 'best', 'how to',
    'vs', 'review', 'price', 'download', 'install', 'setup', 'config',
    'error', 'fix', 'problem', 'issue', 'help', 'support', 'api',
    'example', 'demo', 'course', 'training', 'certification', 'job'
  ];
  
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const suggestions: string[] = [];
  
  // 生成基于字母的建议
  alphabet.split('').forEach(letter => {
    suggestions.push(`${keyword} ${letter}`);
    suggestions.push(`${keyword} a${letter}`);
    suggestions.push(`${keyword} ${letter}a`);
  });
  
  // 添加常见后缀
  commonSuffixes.forEach(suffix => {
    suggestions.push(`${keyword} ${suffix}`);
    suggestions.push(`${suffix} ${keyword}`);
  });
  
  // 数字组合
  for (let i = 0; i <= 20; i++) {
    suggestions.push(`${keyword} ${i}`);
    suggestions.push(`${keyword} ${i}0`);
  }
  
  return suggestions.slice(0, 100); // 返回前100个建议
}

// Google Trends 相关功能
export async function getGoogleTrendsData(keyword: string, options?: {
  startTime?: Date;
  endTime?: Date;
  geo?: string;
}): Promise<number[]> {
  try {
    console.log(`正在获取 "${keyword}" 的Google Trends数据...`);
    
    const trendsData = await googleTrends.interestOverTime({
      keyword: keyword,
      startTime: options?.startTime || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30天前
      endTime: options?.endTime || new Date(),
      geo: options?.geo || 'US',
    });

    const data = JSON.parse(trendsData);
    const timeline = data.default?.timelineData || [];
    
    // 提取最近7天的数据点
    const recentData = timeline.slice(-7).map((item: any) => {
      const value = item.value && item.value.length > 0 ? item.value[0] : 0;
      return Math.max(0, value); // 确保非负数
    });
    
    console.log(`"${keyword}" 的趋势数据:`, recentData);
    
    return recentData.length > 0 ? recentData : [50, 55, 48, 62, 58, 65, 60]; // 备用数据
  } catch (error) {
    console.error(`获取 "${keyword}" 的Google Trends数据失败:`, error);
    // 返回模拟趋势数据作为备用
    return Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 30);
  }
}

// 获取相关关键词建议
export async function getRelatedKeywords(keyword: string): Promise<string[]> {
  try {
    console.log(`正在获取 "${keyword}" 的相关关键词...`);
    
    const relatedData = await googleTrends.relatedQueries({
      keyword: keyword,
      startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endTime: new Date(),
      geo: 'US',
    });

    const data = JSON.parse(relatedData);
    const queries = data.default?.rankedList?.[0]?.rankedKeyword || [];
    
    const relatedKeywords = queries.slice(0, 10).map((item: any) => item.query || '');
    console.log(`"${keyword}" 的相关关键词:`, relatedKeywords);
    
    return relatedKeywords;
  } catch (error) {
    console.error(`获取 "${keyword}" 相关关键词失败:`, error);
    return [`${keyword} tutorial`, `${keyword} guide`, `${keyword} tips`];
  }
}

// 估算搜索量（基于Google Trends相对值）
function estimateSearchVolume(trendsValue: number, keyword: string): number {
  // 基于关键词特征和趋势值估算搜索量
  let baseMultiplier = 30000;
  
  // 根据关键词类型调整基础倍数
  if (keyword.includes('how to')) baseMultiplier = 50000;
  else if (keyword.includes('best')) baseMultiplier = 40000;
  else if (keyword.includes('free')) baseMultiplier = 60000;
  else if (keyword.includes('download')) baseMultiplier = 70000;
  else if (keyword.length < 10) baseMultiplier = 80000; // 短关键词通常搜索量更高
  
  const randomFactor = 0.7 + Math.random() * 0.6; // 0.7-1.3的随机因子
  const calculated = Math.round((trendsValue / 100) * baseMultiplier * randomFactor);
  
  // 确保最小值
  return Math.max(calculated, 1000);
}

// 评估关键词难度
function assessDifficulty(keyword: string, volume: number): 'Easy' | 'Medium' | 'Hard' {
  const wordCount = keyword.split(' ').length;
  const hasCompetitiveTerms = /best|top|review|vs|comparison/.test(keyword.toLowerCase());
  
  if (volume > 100000 || wordCount <= 2 || hasCompetitiveTerms) return 'Hard';
  if (volume > 30000 || wordCount === 3) return 'Medium';
  return 'Easy';
}

// 判断搜索意图
function determineSearchIntent(keyword: string): 'Informational' | 'Commercial' | 'Transactional' | 'Navigational' {
  const lowerKeyword = keyword.toLowerCase();
  
  if (/buy|purchase|order|cart|checkout|price|cost|cheap|deal/.test(lowerKeyword)) {
    return 'Transactional';
  }
  if (/how to|what is|guide|tutorial|learn|tips|example/.test(lowerKeyword)) {
    return 'Informational';
  }
  if (/best|top|review|compare|comparison|vs|alternative/.test(lowerKeyword)) {
    return 'Commercial';
  }
  
  return 'Informational';
}

// 分析单个关键词
export async function analyzeKeyword(keyword: string): Promise<KeywordData> {
  try {
    console.log(`开始分析关键词: "${keyword}"`);
    
    // 获取Google Trends数据
    const trendData = await getGoogleTrendsData(keyword);
    
    // 计算平均趋势值用于估算搜索量
    const avgTrend = trendData.reduce((sum, val) => sum + val, 0) / trendData.length;
    const estimatedVolume = estimateSearchVolume(avgTrend, keyword);

    const keywordData: KeywordData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      keyword: keyword,
      volume: estimatedVolume,
      difficulty: assessDifficulty(keyword, estimatedVolume),
      competition: Math.random() * 0.7 + 0.15, // 0.15-0.85之间的竞争度
      cpc: Math.random() * 2.5 + 0.3, // $0.3-$2.8的CPC
      trend: trendData,
      searchIntent: determineSearchIntent(keyword),
    };

    console.log(`关键词 "${keyword}" 分析完成:`, keywordData);
    return keywordData;
    
  } catch (error) {
    console.error(`关键词 "${keyword}" 分析失败:`, error);
    
    // 返回备用数据
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      keyword: keyword,
      volume: Math.floor(Math.random() * 50000) + 10000,
      difficulty: 'Medium',
      competition: Math.random() * 0.6 + 0.2,
      cpc: Math.random() * 2 + 1,
      trend: Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 30),
      searchIntent: determineSearchIntent(keyword),
    };
  }
}

// 主要的搜索分析函数 - 基于用户输入生成a-z建议并分析
export async function searchAndAnalyzeKeywords(seedKeyword: string): Promise<{
  mainKeyword: KeywordData;
  relatedKeywords: KeywordData[];
  totalSuggestions: number;
}> {
  console.log(`开始基于 "${seedKeyword}" 进行a-z关键词分析...`);
  
  try {
    // 1. 分析主关键词
    const mainKeywordData = await analyzeKeyword(seedKeyword);
    
    // 2. 生成a-z遍历建议
    const alphabetSuggestions = await generateAlphabetSuggestions(seedKeyword);
    console.log(`生成了 ${alphabetSuggestions.length} 个字母遍历建议`);
    
    // 3. 获取Google自动完成建议
    const autoCompleteSuggestions = await getGoogleAutoComplete(seedKeyword);
    console.log(`生成了 ${autoCompleteSuggestions.length} 个自动完成建议`);
    
    // 4. 合并所有建议并去重
    const allSuggestions = [...new Set([...alphabetSuggestions, ...autoCompleteSuggestions])];
    console.log(`合并去重后共 ${allSuggestions.length} 个建议`);
    
    // 5. 选择最相关的关键词进行分析（避免API限制）
    const keywordsToAnalyze = allSuggestions
      .filter(k => k !== seedKeyword && k.length > 3) // 过滤掉太短的词
      .slice(0, 8); // 只分析前8个相关关键词
    
    console.log(`选择分析以下关键词:`, keywordsToAnalyze);
    
    // 6. 批量分析选中的关键词
    const relatedResults: KeywordData[] = [];
    
    for (let i = 0; i < keywordsToAnalyze.length; i++) {
      const keyword = keywordsToAnalyze[i];
      try {
        console.log(`正在分析第 ${i + 1}/${keywordsToAnalyze.length} 个关键词: "${keyword}"`);
        const result = await analyzeKeyword(keyword);
        relatedResults.push(result);
        
        // 添加延迟避免API限制
        if (i < keywordsToAnalyze.length - 1) {
          console.log('等待1秒以避免API限制...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`分析关键词 "${keyword}" 失败:`, error);
      }
    }
    
    console.log(`分析完成! 主关键词: 1个, 相关关键词: ${relatedResults.length}个, 总建议数: ${allSuggestions.length}`);
    
    return {
      mainKeyword: mainKeywordData,
      relatedKeywords: relatedResults,
      totalSuggestions: allSuggestions.length
    };
    
  } catch (error) {
    console.error('搜索分析失败:', error);
    
    // 返回备用结果
    const backupResult = await analyzeKeyword(seedKeyword);
    return {
      mainKeyword: backupResult,
      relatedKeywords: [],
      totalSuggestions: 0
    };
  }
}

// 生成实时关键词建议（用于搜索框下拉）
export async function generateKeywordSuggestions(seedKeyword: string): Promise<string[]> {
  try {
    // 快速生成一些基础建议（不调用API）
    const quickSuggestions = [
      `${seedKeyword}`,
      `how to ${seedKeyword}`,
      `${seedKeyword} tutorial`,
      `${seedKeyword} guide`,
      `${seedKeyword} tips`,
      `best ${seedKeyword}`,
      `${seedKeyword} free`,
      `${seedKeyword} online`,
      `${seedKeyword} download`,
      `${seedKeyword} app`,
    ];
    
    return quickSuggestions.filter(s => s.trim().length > 0);
  } catch (error) {
    console.error('生成关键词建议失败:', error);
    return [`${seedKeyword}`];
  }
}