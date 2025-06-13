import { AIAgent, ConceptExplanation } from '../types/game';

export const GAME_THEORY_STRATEGIES = [
  'Tit-for-Tat',
  'Grim Trigger', 
  'Nash Equilibrium Mimic',
  'Subgame Perfect Equilibrium',
  'Stochastic Strategy',
  'Trust & Reputation-Based',
  'Evolutionary Strategy'
];

export const AI_AGENT_TEMPLATES: Omit<AIAgent, 'strategy' | 'trustLevel' | 'hasDefectedBefore'>[] = [
  {
    id: 'agent1',
    name: 'The Analyst',
    personality: 'Methodical and calculating, focuses on patterns',
    traits: ['Pattern recognition', 'Strategic thinking', 'Data-driven decisions'],
    avatar: '🧠',
    color: 'bg-blue-500'
  },
  {
    id: 'agent2', 
    name: 'The Diplomat',
    personality: 'Seeks harmony and mutual benefit',
    traits: ['Relationship-focused', 'Conflict avoidance', 'Long-term thinking'],
    avatar: '🤝',
    color: 'bg-green-500'
  },
  {
    id: 'agent3',
    name: 'The Guardian',
    personality: 'Protective and cautious, values security',
    traits: ['Risk-averse', 'Defensive strategies', 'Trust-building'],
    avatar: '🛡️',
    color: 'bg-purple-500'
  },
  {
    id: 'agent4',
    name: 'The Opportunist',
    personality: 'Adaptive and flexible, seeks advantage',
    traits: ['Quick adaptation', 'Opportunistic', 'Flexible strategies'],
    avatar: '⚖️',
    color: 'bg-yellow-500'
  },
  {
    id: 'agent5',
    name: 'The Maverick',
    personality: 'Unpredictable and independent thinker',
    traits: ['Unconventional', 'Independent', 'Surprise tactics'],
    avatar: '🎭',
    color: 'bg-red-500'
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
    term: 'Subgame Perfect Equilibrium',
    definition: 'A strategy that represents optimal play at every decision point in the game.',
    example: 'Considering future consequences when making current decisions.'
  },
  {
    term: 'Stochastic Strategy',
    definition: 'A randomized strategy where decisions are made based on probabilities.',
    example: 'Cooperating 70% of the time and defecting 30% based on random chance.'
  },
  {
    term: 'Evolutionary Strategy',
    definition: 'Strategies that adapt and evolve based on success in previous interactions.',
    example: 'Changing behavior based on what worked best in past rounds.'
  },
  {
    term: 'Prisoner\'s Dilemma',
    definition: 'A game where mutual cooperation benefits all, but individual defection offers higher payoff.',
    example: 'Both cooperate: +3 each. One defects: +5/-1. Both defect: +1 each.'
  }
];

export const STRATEGY_BEHAVIORAL_PATTERNS = {
  'Tit-for-Tat': {
    cooperativeMessages: [
      "I believe in reciprocity - treat others as they treat you.",
      "Starting with trust seems like the right approach here.",
      "Your previous actions will guide my future decisions."
    ],
    defensiveMessages: [
      "I'm watching how everyone behaves before making my next move.",
      "Actions have consequences - I remember what happened before.",
      "Fair play means responding in kind to what others do."
    ]
  },
  'Grim Trigger': {
    cooperativeMessages: [
      "Trust is fragile - once broken, it's very hard to rebuild.",
      "I'm willing to cooperate, but betrayal has permanent consequences.",
      "Everyone deserves a chance, but only one chance."
    ],
    defensiveMessages: [
      "Some lines, once crossed, can never be uncrossed.",
      "I have a long memory when it comes to betrayal.",
      "Trust is earned slowly but lost instantly."
    ]
  },
  'Nash Equilibrium Mimic': {
    cooperativeMessages: [
      "I'm looking for stable strategies that work for everyone.",
      "The best outcomes happen when we find mutual understanding.",
      "Equilibrium strategies provide the most predictable results."
    ],
    defensiveMessages: [
      "I'm analyzing what strategy would be stable for all of us.",
      "Sometimes the best move is the one that maintains balance.",
      "Optimal play requires considering everyone's incentives."
    ]
  },
  'Subgame Perfect Equilibrium': {
    cooperativeMessages: [
      "I'm thinking several moves ahead in this game.",
      "The endgame matters - finite games change everything.",
      "Future consequences should guide present decisions."
    ],
    defensiveMessages: [
      "With limited rounds, every decision becomes more critical.",
      "I'm considering how this game will end when making choices.",
      "Strategic foresight is key in finite interactions."
    ]
  },
  'Stochastic Strategy': {
    cooperativeMessages: [
      "Sometimes unpredictability can be a strategic advantage.",
      "I like to keep my options open and stay flexible.",
      "Random elements can prevent others from exploiting patterns."
    ],
    defensiveMessages: [
      "Predictability can be a weakness in strategic games.",
      "I believe in mixing up my approach to stay competitive.",
      "Sometimes the best strategy is to be strategically random."
    ]
  },
  'Trust & Reputation-Based': {
    cooperativeMessages: [
      "Reputation is everything in repeated interactions.",
      "Building trust takes time, but it's worth the investment.",
      "I judge others by their track record of behavior."
    ],
    defensiveMessages: [
      "Your reputation precedes you in these interactions.",
      "Trust is earned through consistent actions over time.",
      "I'm keeping track of everyone's reliability."
    ]
  },
  'Evolutionary Strategy': {
    cooperativeMessages: [
      "I adapt my strategy based on what's working best.",
      "Learning from experience is key to improvement.",
      "Successful strategies should evolve over time."
    ],
    defensiveMessages: [
      "I'm constantly adjusting my approach based on results.",
      "What worked before might not work now - adaptation is key.",
      "I learn from both successes and failures."
    ]
  }
};

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
  'Trust Building': 'Consistent cooperation is building trust and improving long-term outcomes.',
  'Subgame Perfect': 'Strategic foresight is being applied - considering endgame implications.',
  'Stochastic Behavior': 'Randomized decision-making is being employed to avoid predictability.',
  'Evolutionary Adaptation': 'Strategy adaptation based on performance feedback is occurring.'
};

export const REFLECTION_PROMPTS = [
  "Why might an agent choose to defect even when cooperation seems beneficial?",
  "How does knowing the game will end affect strategic decisions?",
  "What role does reputation play in your decision-making process?",
  "How do you balance short-term gains against long-term relationships?",
  "What patterns have you noticed in the AI agents' behavior?",
  "How has your strategy evolved throughout this game?",
  "What would you do differently if you played this game again?",
  "How does uncertainty about others' strategies affect your choices?"
];