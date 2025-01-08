export interface StatisticsData {
  ids: string[];
  replies: number[];
  entries: number[];
  idAndReplies: [string, number][];
  idAndEntries: [string, number][];
}

export interface ChartData {
  _id: string;
  mainEntries: number;
  replies: number;
} 