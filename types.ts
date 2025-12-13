export enum Category {
  ALL = '全部',
  MIND = '心智成长',
  BUSINESS = '商业思考',
  WEALTH = '财富逻辑',
  READING = '读书笔记'
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
  date: string;
  readTime: string;
  coverImage: string;
  content: string; // Simulating Markdown content
}

export type ViewState = 'LIST' | 'DETAIL' | 'ABOUT' | 'EDITOR';