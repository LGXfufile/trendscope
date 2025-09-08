declare module 'google-trends-api' {
  interface InterestOverTimeOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    timezone?: number;
    category?: number;
    gprop?: string;
  }

  interface RelatedQueriesOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    timezone?: number;
    category?: number;
  }

  export function interestOverTime(options: InterestOverTimeOptions): Promise<string>;
  export function relatedQueries(options: RelatedQueriesOptions): Promise<string>;
  export function relatedTopics(options: RelatedQueriesOptions): Promise<string>;
  export function dailyTrends(options?: { geo?: string; hl?: string }): Promise<string>;
  export function realTimeTrends(options?: { geo?: string; hl?: string; category?: string }): Promise<string>;
}