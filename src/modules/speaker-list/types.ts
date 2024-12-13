export interface Speaker {
  id: number;
  name: string;
  number: string;
  group: string;
  speaking: boolean;
  replies?: Reply[];
}

export interface Reply {
  number: string;
  name: string;
  group: string;
  speaking: boolean;
} 