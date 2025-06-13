import { AIAgent, ConceptExplanation } from '../types/game';

export const AI_AGENTS: AIAgent[] = [
  {
    id: 'loyalist',
    name: 'The Loyalist',
    personality: 'Trusting and forgiving, believes in cooperation',
    traits: ['High trust', 'Forgives once', 'Values long-term relationships'],
    strategy: 'Tit-for-Tat',
    trustLevel: 85,
    avatar: '🤝',
    color: 'bg-blue-500'
  },
  {
    id: 'cynic',
    name: 'The Cynic',
    personality: 'Suspicious and unforgiving, expects betrayal',
    traits: ['Low trust', 'Grim Trigger', 'Never forgets betrayal'],
    strategy: 'Grim Trigger',
    trustLevel: 25,
    avatar: '🔒',
    color: 'bg-red-500'
  },
  {
    id: 'opportunist',
    name: 'The Opportunist',
    personality: 'Adaptive and calculating, seeks maximum gain',
    traits: ['Shifting strategy', 'Short-term focus', 'Payoff maximizer'],
    strategy: 'Opportunistic',
    trustLevel: 60,
    avatar: '⚖️',
    color: 'bg-yellow-500'
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    personality: 'Analytical and patient, plays the long game',
    traits: ['Strategic thinker', 'Pattern recognition', 'Equilibrium seeker'],
    strategy: 'Nash Equilibrium Seeker',
    trustLevel: 70,
    avatar: '🧠',
    color: 'bg-purple-500'
  },
  {
    id: 'mirror',
    name: 'The Mirror',
    personality: 'Reactive and adaptive, learns from patterns',
    traits: ['Pattern matching', 'Adaptive behavior', 'Memory-based decisions'],
    strategy: 'Adaptive Mirroring',
    trustLevel: 65,
    avatar: '🪞',
    color: 'bg-indigo-500'
  }
];

export const DISCUSSION_TOPICS = [
  "Is it ever rational to trust a stranger in a one-time interaction?",
  "Does reputation matter more than immediate gain in strategic decisions?",
  "Can cooperation emerge naturally without enforcement mechanisms?",
  "Is betrayal justified if it prevents greater harm to oneself?",
  "How do you distinguish between strategic deception and outright dishonesty?",
  "What role does empathy play in competitive environments?",
  "Are there situations where defection is the most ethical choice?",
  "How do you rebuild trust after it has been broken?",
  "Should rational actors always maximize their individual payoff?",
  "Can altruism be a winning strategy in repeated games?",
  "What is the value of reputation in anonymous interactions?",
  "How does uncertainty affect cooperative behavior?"
];

export const GAME_THEORY_CONCEPTS: ConceptExplanation[] = [
  {
    term: 'Nash Equilibrium',
    definition: 'A stable strategy where no player benefits by changing their decision unilaterally.',
    example: 'When all players choose their best response to others\' strategies.'
  },
  {
    term: 'Tit-for-Tat Strategy',
    definition: 'A strategy that mirrors the opponent\'s previous move.',
    example: 'Cooperate first, then copy what your opponent did last round.'
  },
  {
    term: 'Grim Trigger',
    definition: 'A strategy that cooperates until the first defection, then defects permanently.',
    example: 'One betrayal triggers eternal retaliation.'
  },
  {
    term: 'Prisoner\'s Dilemma',
    definition: 'A game where mutual cooperation benefits all, but individual defection offers higher payoff.',
    example: 'Both cooperate: +3 each. One defects: +5/-1. Both defect: +1 each.'
  },
  {
    term: 'Evolutionary Strategy',
    definition: 'Strategies that adapt and evolve based on success in previous interactions.',
    example: 'Changing behavior based on what worked best in past rounds.'
  },
  {
    term: 'Stochastic Game',
    definition: 'A game with uncertain ending where each round has a probability of being the last.',
    example: 'Each round has a 5% chance of ending the game unexpectedly.'
  }
];

export const PAYOFF_MATRIX = {
  'cooperate-cooperate': { human: 3, ai: 3 },
  'cooperate-defect': { human: 0, ai: 5 },
  'defect-cooperate': { human: 5, ai: 0 },
  'defect-defect': { human: 1, ai: 1 }
};

export const EDUCATIONAL_INSIGHTS = {
  'Nash Equilibrium': 'This round demonstrates a Nash Equilibrium - a stable state where no player can improve by changing strategy alone.',
  'Grim Trigger': 'A Grim Trigger strategy has been activated - permanent retaliation after the first betrayal.',
  'Tit-for-Tat': 'Tit-for-Tat behavior observed - mirroring the opponent\'s previous move.',
  'Cooperation Breakdown': 'Trust has eroded, leading to mutual defection and lower payoffs for everyone.',
  'Trust Building': 'Consistent cooperation is building trust and improving long-term outcomes.'
};