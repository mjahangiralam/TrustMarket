export interface GameConfig {
  maxRounds: number;
  discussionTime: number;
  aiAgentCount: number;
  elevenLabsKey?: string;
  aiPersonalityKey?: string;
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
  hasDefectedBefore?: boolean;
  lastMessageTime?: number;
  messageCount?: number;
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
  individualPayoffs?: Record<string, { human: number; ai: number }>;
  strategicInsight?: string;
  reflectionPrompt?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: number;
  isAI: boolean;
  agentId?: string;
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
  showPerRoundPayoff?: boolean;
  conceptsEncountered?: string[];
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

export interface StrategyReveal {
  agentId: string;
  strategy: string;
  behavioralJustification: string;
  keyDecisions: string[];
}