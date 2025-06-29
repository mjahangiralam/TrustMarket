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
  "How does uncertainty affect cooperative behavior?",
  "When is it better to be predictable versus unpredictable?",
  "Does forgiveness have a place in strategic interactions?",
  "How do you balance self-interest with collective benefit?",
  "What makes a strategy 'fair' in repeated games?",
  "Is there such a thing as too much cooperation?",
  "How do you handle someone who seems to be playing a different game?",
  "What role does communication play in building trust?",
  "Can you be too trusting in strategic situations?",
  "How do emotions affect rational decision-making?",
  "What makes some people naturally more cooperative than others?",
  "Is it better to be feared or loved in strategic games?",
  "How do cultural differences affect cooperation patterns?",
  "What role does personality play in strategic choices?",
  "Can you change someone's strategy through your own behavior?",
  "How do past experiences influence current decisions?",
  "What makes a strategy 'intuitive' versus 'counterintuitive'?",
  "When is it rational to be irrational?",
  "How do you handle uncertainty about the game's rules?",
  "What's the difference between a strategy and a tactic?",
  "How do you know when to change your strategy?",
  "Is there always a 'best' strategy in repeated games?",
  "What role does timing play in strategic decisions?",
  "How do you evaluate a strategy's success?",
  "Can a losing strategy ever be the right choice?",
  "How do these principles apply to business negotiations?",
  "What can we learn about international relations from game theory?",
  "How do these strategies work in social relationships?",
  "What role does reputation play in online interactions?",
  "How do these concepts apply to environmental cooperation?",
  "What can game theory teach us about teamwork?",
  "How do these strategies work in competitive sports?",
  "What role does trust play in economic transactions?",
  "Is cooperation a natural human tendency or learned behavior?",
  "What does it mean to be 'rational' in social situations?",
  "Can you be both selfish and ethical?",
  "What is the value of consistency in behavior?",
  "How do you define 'success' in repeated interactions?",
  "Is there such a thing as a 'winning personality'?",
  "What role does luck play in strategic outcomes?",
  "How do you measure the 'goodness' of a strategy?",
  "How do you handle multiple opponents with different strategies?",
  "What happens when the game rules change mid-game?",
  "How do you adapt when your strategy isn't working?",
  "What role does information asymmetry play?",
  "How do you handle someone who's trying to manipulate you?",
  "What's the difference between cooperation and collusion?",
  "How do you maintain cooperation in large groups?",
  "What happens when the stakes change dramatically?"
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

// Significantly expanded categorized discussion topics for different game modes
export const DISCUSSION_TOPIC_CATEGORIES = {
  beginner: [
    "What does it mean to cooperate with someone?",
    "Why might someone choose to betray trust?",
    "How do you decide whether to trust a new person?",
    "What happens when everyone works together?",
    "What happens when everyone only thinks of themselves?",
    "How do you feel when someone breaks a promise?",
    "Is it better to be nice or competitive with others?",
    "What makes a good teammate in group activities?",
    "Should you always tell the truth in games?",
    "How do you make friends with people who are different?",
    "What's the difference between being smart and being kind?",
    "When is it okay to change your mind about someone?",
    "How do you know if someone is being honest with you?",
    "What would you do if everyone else was being mean?",
    "Is it important to keep your promises even when it's hard?",
    "How do you handle someone who doesn't play fair?",
    "What's more important: winning or being a good sport?",
    "How do you decide who to trust in a new group?",
    "Should you help someone even if they might not help you back?",
    "What makes someone a good leader in team games?"
  ],
  
  intermediate: [
    "How do you balance short-term benefits with long-term relationships?",
    "What role does reputation play in repeated interactions?",
    "How do you handle someone who consistently breaks agreements?",
    "When is self-interest justified over group benefit?",
    "How do you rebuild trust after it's been damaged?",
    "What constitutes a 'fair' strategy in competitive situations?",
    "Is there such a thing as being too cooperative?",
    "How do you adapt when others aren't playing by your rules?",
    "What role does communication play in building alliances?",
    "Can you be too trusting in strategic environments?",
    "How do you maintain integrity while staying competitive?",
    "What's the difference between strategy and manipulation?",
    "How do you handle conflicting loyalties in group dynamics?",
    "When should you forgive repeated betrayals?",
    "How do you balance transparency with strategic advantage?",
    "What makes a strategy sustainable over time?",
    "How do you deal with uncertainty about others' intentions?",
    "What role does timing play in strategic decisions?",
    "How do you maintain cooperation in competitive environments?",
    "When is it worth sacrificing immediate gains for future benefits?",
    "How do you handle someone who seems unpredictable?",
    "What's the value of consistency in your approach?",
    "How do you adapt your strategy based on group dynamics?",
    "When should you reveal your strategy to others?"
  ],
  
  advanced: [
    "How do you optimize strategies when facing multiple opponents with unknown preferences?",
    "What role does information asymmetry play in strategic interactions?",
    "How do you maintain cooperation when monitoring is imperfect?",
    "What happens when the rules of engagement change mid-interaction?",
    "How do you handle strategic situations with incomplete information?",
    "What's the optimal response to mixed strategies from opponents?",
    "How do you design mechanisms that incentivize truthful behavior?",
    "What role does signaling play in establishing credible commitments?",
    "How do you handle multi-stage games with changing payoff structures?",
    "What strategies work best in infinitely repeated interactions?",
    "How do you evaluate the robustness of equilibrium strategies?",
    "What's the impact of communication costs on cooperative outcomes?",
    "How do you handle strategic complementarities in group decisions?",
    "What role does learning play in evolutionary stable strategies?",
    "How do you design punishment mechanisms that deter defection?",
    "What's the optimal level of transparency in strategic interactions?",
    "How do you handle network effects in multi-agent systems?",
    "What strategies emerge in tournaments with diverse opponents?",
    "How do you balance exploration and exploitation in uncertain environments?",
    "What role does reputation decay play in long-term interactions?",
    "How do you handle strategic situations with externalities?",
    "What's the impact of cognitive limitations on strategic behavior?",
    "How do you design robust strategies for noisy environments?",
    "What role does commitment power play in strategic negotiations?"
  ],
  
  philosophical: [
    "Is cooperation an innate human drive or a learned social construct?",
    "What does it mean to act 'rationally' in social contexts?",
    "Can self-interested behavior ever be truly altruistic?",
    "What is the moral value of consistency in our actions?",
    "How do we define 'success' in human interactions?",
    "Is there an inherent conflict between individual and collective good?",
    "What role does free will play in strategic decision-making?",
    "How do we balance justice with mercy in repeated interactions?",
    "What is the nature of trust in human relationships?",
    "Can strategic thinking coexist with authentic relationships?",
    "What does it mean to 'win' in life's strategic games?",
    "How do we reconcile competition with compassion?",
    "What is the relationship between power and responsibility?",
    "How do we maintain our humanity in strategic environments?",
    "What role does intuition play versus calculated reasoning?",
    "Is there such a thing as a 'natural' social order?",
    "How do we balance individual autonomy with social cooperation?",
    "What is the source of moral obligations in strategic interactions?",
    "How do we handle the tension between honesty and strategy?",
    "What role does empathy play in rational decision-making?",
    "Can we ever truly understand another person's motivations?",
    "What is the relationship between wisdom and strategic thinking?",
    "How do we define fairness in competitive situations?",
    "What role does forgiveness play in maintaining social bonds?"
  ],
  
  realWorld: [
    "How do these principles apply to salary negotiations?",
    "What can we learn about international trade agreements from game theory?",
    "How do these strategies work in romantic relationships?",
    "What role does reputation play in social media interactions?",
    "How do these concepts apply to climate change cooperation?",
    "What can game theory teach us about effective teamwork?",
    "How do these strategies apply to competitive sports psychology?",
    "What role does trust play in financial markets?",
    "How do these principles work in political negotiations?",
    "What can we learn about parenting from strategic thinking?",
    "How do these concepts apply to workplace dynamics?",
    "What role does cooperation play in urban planning?",
    "How do these strategies work in academic collaborations?",
    "What can game theory teach us about healthcare resource allocation?",
    "How do these principles apply to online community management?",
    "What role does trust play in supply chain management?",
    "How do these concepts work in legal negotiations?",
    "What can we learn about education from strategic interactions?",
    "How do these strategies apply to family decision-making?",
    "What role does cooperation play in scientific research?",
    "How do these principles work in customer service?",
    "What can game theory teach us about social movements?",
    "How do these concepts apply to resource sharing in communities?",
    "What role does strategic thinking play in personal finance?"
  ],
  
  psychological: [
    "How do emotions override rational strategic thinking?",
    "What makes some individuals naturally more cooperative?",
    "Is it more effective to be feared or respected in strategic games?",
    "How do cultural backgrounds influence cooperation patterns?",
    "What role does personality type play in strategic preferences?",
    "Can you influence someone's strategy through behavioral cues?",
    "How do childhood experiences shape adult strategic behavior?",
    "What makes a strategy feel 'natural' versus forced?",
    "How does stress affect strategic decision-making quality?",
    "What role does social anxiety play in cooperation choices?",
    "How do cognitive biases influence strategic thinking?",
    "What impact does sleep deprivation have on strategic decisions?",
    "How does group pressure affect individual strategic choices?",
    "What role does self-esteem play in competitive behavior?",
    "How do past betrayals influence current trust decisions?",
    "What makes someone more likely to forgive strategic betrayals?",
    "How does age affect strategic thinking patterns?",
    "What role does gender play in cooperative behavior?",
    "How do mental health conditions affect strategic interactions?",
    "What impact does physical environment have on cooperation?",
    "How does time pressure change strategic decision-making?",
    "What role does empathy play in predicting others' moves?",
    "How do learning disabilities affect strategic game performance?",
    "What makes someone more susceptible to strategic manipulation?"
  ],

  ethical: [
    "Is it ever morally acceptable to deceive for strategic advantage?",
    "What are our ethical obligations in competitive situations?",
    "How do we balance personal gain with harm to others?",
    "When does strategic behavior cross into manipulation?",
    "What role does consent play in strategic interactions?",
    "How do we handle conflicts between loyalty and honesty?",
    "Is there a moral difference between active deception and withholding information?",
    "What ethical frameworks should guide strategic decision-making?",
    "How do we balance individual rights with collective welfare?",
    "What are the ethics of exploiting others' psychological biases?",
    "When is it justified to break a strategic agreement?",
    "How do we handle situations where all options seem morally problematic?",
    "What role does intention play in evaluating strategic actions?",
    "How do we balance transparency with strategic necessity?",
    "What are our responsibilities when we have strategic advantages?",
    "How do we handle ethical dilemmas in zero-sum situations?",
    "What role does reciprocity play in moral strategic behavior?",
    "How do we evaluate the ethics of preemptive strategic moves?",
    "What obligations do we have to warn others of strategic risks?",
    "How do we balance forgiveness with accountability in strategic contexts?",
    "What role does cultural relativism play in strategic ethics?",
    "How do we handle situations where cooperation enables harmful behavior?",
    "What are the ethics of strategic behavior in positions of power?",
    "How do we balance strategic thinking with moral intuition?"
  ],

  economic: [
    "How do market dynamics reflect strategic interactions?",
    "What role does information play in economic strategic decisions?",
    "How do auction strategies apply to everyday negotiations?",
    "What can we learn from behavioral economics about cooperation?",
    "How do network effects influence strategic business decisions?",
    "What role does reputation play in market transactions?",
    "How do strategic interactions affect price formation?",
    "What can game theory teach us about investment strategies?",
    "How do regulatory frameworks influence strategic behavior?",
    "What role does risk assessment play in economic strategic thinking?",
    "How do strategic partnerships affect market competition?",
    "What can we learn from platform economics about cooperation?",
    "How do strategic interactions influence innovation patterns?",
    "What role does timing play in market entry strategies?",
    "How do strategic behaviors affect resource allocation efficiency?",
    "What can auction theory teach us about strategic bidding?",
    "How do strategic interactions influence labor market outcomes?",
    "What role does signaling play in economic strategic decisions?",
    "How do strategic behaviors affect international trade patterns?",
    "What can we learn from mechanism design about strategic incentives?",
    "How do strategic interactions influence financial market stability?",
    "What role does coordination play in economic development?",
    "How do strategic behaviors affect public goods provision?",
    "What can we learn from contract theory about strategic relationships?"
  ],

  historical: [
    "What can we learn from historical alliances about strategic cooperation?",
    "How did strategic thinking influence major historical negotiations?",
    "What role did trust play in historical trade relationships?",
    "How do historical conflicts illustrate strategic decision-making?",
    "What can we learn from historical diplomatic strategies?",
    "How did strategic thinking influence historical military tactics?",
    "What role did reputation play in historical political alliances?",
    "How do historical examples illustrate the evolution of strategic thinking?",
    "What can we learn from historical economic partnerships?",
    "How did strategic considerations influence historical exploration?",
    "What role did strategic thinking play in historical social movements?",
    "How do historical examples show the importance of strategic timing?",
    "What can we learn from historical peace negotiations?",
    "How did strategic considerations influence historical technological development?",
    "What role did strategic alliances play in historical empire building?",
    "How do historical examples illustrate strategic adaptation?",
    "What can we learn from historical examples of strategic betrayal?",
    "How did strategic thinking influence historical religious movements?",
    "What role did strategic considerations play in historical migration patterns?",
    "How do historical examples show the evolution of cooperative institutions?",
    "What can we learn from historical examples of strategic innovation?",
    "How did strategic thinking influence historical cultural exchanges?",
    "What role did strategic considerations play in historical environmental management?",
    "How do historical examples illustrate the long-term consequences of strategic decisions?"
  ]
};

// Function to get topics based on category with enhanced randomization
export const getDiscussionTopics = (category?: keyof typeof DISCUSSION_TOPIC_CATEGORIES | 'all') => {
  if (!category || category === 'all') {
    // Combine all categories for maximum variety
    const allTopics = [
      ...DISCUSSION_TOPICS,
      ...Object.values(DISCUSSION_TOPIC_CATEGORIES).flat()
    ];
    // Remove duplicates
    return [...new Set(allTopics)];
  }
  return DISCUSSION_TOPIC_CATEGORIES[category] || DISCUSSION_TOPICS;
};

// Function to get a weighted random topic (prevents recent repeats)
export const getRandomDiscussionTopic = (
  category?: keyof typeof DISCUSSION_TOPIC_CATEGORIES | 'all',
  recentTopics: string[] = []
): string => {
  const availableTopics = getDiscussionTopics(category);
  
  // Filter out recently used topics if we have enough alternatives
  const filteredTopics = availableTopics.length > recentTopics.length + 5 
    ? availableTopics.filter(topic => !recentTopics.includes(topic))
    : availableTopics;
  
  return filteredTopics[Math.floor(Math.random() * filteredTopics.length)];
};