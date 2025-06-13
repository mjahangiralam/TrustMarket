export interface GameConfig {
  maxRounds: number;
  discussionTime: number;
  aiAgentCount: number;
  elevenLabsKey?: string;
  educationalMode: boolean;
  gameMode: 'finite' | 'stochastic';
}

export interface AIAgent {
  id: string;
  name: string;
  personality: string;
  traits: string[];
  strategy: string;
  trustLevel: number;
  avatar: string;
  color: string;
  hasDefectedBefore?: boolean; // For Grim Trigger tracking
}

export interface GameRound {
  round: number;
  humanChoice: 'cooperate' | 'defect' | null;
  aiChoices: Record<string, 'cooperate' | 'defect'>;
  payoffs: Record<string, number>;
  humanPayoff: number;
  cumulativePayoff: number;
  event?: string;
  discussion: ChatMessage[];
  individualPayoffs?: Record<string, { human: number; ai: number }>; // Pairwise payoffs
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: number;
  isAI: boolean;
}

export interface GameState {
  phase: 'setup' | 'discussion' | 'decision' | 'results' | 'debrief';
  currentRound: number;
  rounds: GameRound[];
  aiAgents: AIAgent[];
  discussionTopic: string;
  timeRemaining: number;
  isGameEnded: boolean;
  finalCommentary?: string;
  gameConfig?: GameConfig;
}

export interface ConceptExplanation {
  term: string;
  definition: string;
  example?: string;
}

export interface EducationalContent {
  concept: string;
  explanation: string;
  relevantToRound?: number;
}