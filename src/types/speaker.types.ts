export interface Speaker {
  id: number;
  number: string;
  name: string;
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

export interface Representative {
  number: string;
  name: string;
  group: string;
  sex: string;
} 