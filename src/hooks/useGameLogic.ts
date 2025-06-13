import { useState, useCallback, useEffect } from 'react';
import { GameState, GameRound, AIAgent, ChatMessage, GameConfig } from '../types/game';
import { 
  AI_AGENT_TEMPLATES, 
  DISCUSSION_TOPICS, 
  PAYOFF_MATRIX, 
  GAME_THEORY_STRATEGIES,
  STRATEGY_BEHAVIORAL_PATTERNS,
  EDUCATIONAL_INSIGHTS,
  REFLECTION_PROMPTS
} from '../data/gameData';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    currentRound: 1,
    rounds: [],
    aiAgents: [],
    discussionTopic: DISCUSSION_TOPICS[0],
    timeRemaining: 60,
    isGameEnded: false,
    showPerRoundPayoff: false,
    conceptsEncountered: []
  });

  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [messageTimers, setMessageTimers] = useState<Record<string, number>>({});

  // Create AI agents with random strategy assignment
  const createAIAgents = useCallback((count: number): AIAgent[] => {
    console.log('Creating AI agents, count:', count);
    const agents: AIAgent[] = [];
    const availableStrategies = [...GAME_THEORY_STRATEGIES];
    
    for (let i = 0; i < count; i++) {
      const template = AI_AGENT_TEMPLATES[i % AI_AGENT_TEMPLATES.length];
      
      // Randomly assign strategy (without replacement for variety)
      const strategyIndex = Math.floor(Math.random() * availableStrategies.length);
      const strategy = availableStrategies.splice(strategyIndex, 1)[0];
      
      const agent = {
        ...template,
        id: `agent_${i + 1}`,
        strategy,
        trustLevel: 70,
        hasDefectedBefore: false,
        lastMessageTime: 0,
        messageCount: 0
      };
      
      console.log('Created agent:', agent);
      agents.push(agent);
    }
    
    return agents;
  }, []);

  // Enhanced AI decision making with proper strategy implementation
  const getAIDecision = useCallback((agent: AIAgent, round: number, humanHistory: ('cooperate' | 'defect')[], allRounds: GameRound[]): 'cooperate' | 'defect' => {
    const lastHumanMove = humanHistory[humanHistory.length - 1];
    const gameConfig = gameState.gameConfig;
    const isFiniteGame = gameConfig?.gameMode === 'finite';
    const maxRounds = gameConfig?.maxRounds || 10;
    const isNearEnd = isFiniteGame && round >= maxRounds - 2;
    
    switch (agent.strategy) {
      case 'Tit-for-Tat':
        return round === 1 ? 'cooperate' : lastHumanMove;
      
      case 'Grim Trigger':
        return humanHistory.includes('defect') ? 'defect' : 'cooperate';
      
      case 'Nash Equilibrium Mimic':
        // Seek stable mutual strategies
        const cooperateRate = humanHistory.filter(move => move === 'cooperate').length / humanHistory.length;
        if (cooperateRate > 0.7) return 'cooperate';
        if (cooperateRate < 0.3) return 'defect';
        return Math.random() < 0.6 ? 'cooperate' : 'defect';
      
      case 'Subgame Perfect Equilibrium':
        // Consider endgame implications
        if (isNearEnd) {
          // In final rounds, defection becomes more attractive
          return Math.random() < 0.7 ? 'defect' : 'cooperate';
        }
        // Early game: build reputation
        if (round <= 3) return 'cooperate';
        // Mid game: respond to patterns
        return lastHumanMove === 'cooperate' ? 'cooperate' : 'defect';
      
      case 'Stochastic Strategy':
        // Probability-based decisions with some pattern awareness
        const baseCoopProb = 0.6;
        const trustAdjustment = (agent.trustLevel - 50) / 100;
        const finalProb = Math.max(0.1, Math.min(0.9, baseCoopProb + trustAdjustment));
        return Math.random() < finalProb ? 'cooperate' : 'defect';
      
      case 'Trust & Reputation-Based':
        // Decisions based on trust level and reputation
        const trustThreshold = 60;
        if (agent.trustLevel > trustThreshold) {
          return Math.random() < 0.8 ? 'cooperate' : 'defect';
        } else {
          return Math.random() < 0.3 ? 'cooperate' : 'defect';
        }
      
      case 'Evolutionary Strategy':
        // Adapt based on performance
        if (allRounds.length === 0) return 'cooperate';
        
        const recentRounds = allRounds.slice(-3);
        const avgPayoff = recentRounds.reduce((sum, r) => sum + (r.payoffs[agent.id] || 0), 0) / recentRounds.length;
        
        // If performing well, continue current approach
        if (avgPayoff > 2.5) {
          const recentChoices = recentRounds.map(r => r.aiChoices[agent.id]);
          const recentCoopRate = recentChoices.filter(c => c === 'cooperate').length / recentChoices.length;
          return Math.random() < recentCoopRate ? 'cooperate' : 'defect';
        } else {
          // If performing poorly, try opposite approach
          return lastHumanMove === 'cooperate' ? 'defect' : 'cooperate';
        }
      
      default:
        return 'cooperate';
    }
  }, [gameState.gameConfig]);

  // Generate AI chat message based on strategy and context
  const generateAIMessage = useCallback((agent: AIAgent, topic: string, round: number, isDefensive: boolean = false): string => {
    console.log(`Generating message for ${agent.name} - strategy: ${agent.strategy}, topic: ${topic}, round: ${round}, defensive: ${isDefensive}`);
    const patterns = STRATEGY_BEHAVIORAL_PATTERNS[agent.strategy as keyof typeof STRATEGY_BEHAVIORAL_PATTERNS];
    if (!patterns) {
      console.log(`No patterns found for strategy: ${agent.strategy}`);
      return "I'm thinking about the best approach here.";
    }
    
    const messagePool = isDefensive ? patterns.defensiveMessages : patterns.cooperativeMessages;
    const message = messagePool[Math.floor(Math.random() * messagePool.length)];
    console.log(`Generated message: ${message}`);
    return message;
  }, []);

  // Schedule AI messages with minimum frequency - FIXED
  const scheduleAIMessages = useCallback((currentState?: GameState) => {
    console.log('Starting to schedule AI messages...');
    const state = currentState || gameState;
    console.log('Current AI agents:', state.aiAgents);
    
    if (!state.aiAgents || state.aiAgents.length === 0) {
      console.error('No AI agents available for message scheduling');
      return;
    }

    // Clear existing timers first
    Object.values(messageTimers).forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    setMessageTimers({});

    state.aiAgents.forEach((agent, index) => {
      console.log(`Setting up messages for agent ${agent.name}...`);
      const baseDelay = (index + 1) * 3000; // Stagger initial messages
      const messageInterval = 12000; // 12 seconds between messages
      
      // Schedule first message
      const firstMessageTimer = window.setTimeout(() => {
        console.log(`First message timer triggered for ${agent.name}`);
        if (state.phase === 'discussion' && state.timeRemaining > 5) {
          const message: ChatMessage = {
            id: `ai-${agent.id}-${Date.now()}`,
            sender: agent.name,
            message: generateAIMessage(agent, state.discussionTopic, state.currentRound),
            timestamp: Date.now(),
            isAI: true,
            agentId: agent.id
          };
          
          console.log(`Adding first message from ${agent.name}:`, message.message);
          setCurrentMessages(prev => [...prev, message]);
          
          // Update agent message tracking
          setGameState(prev => ({
            ...prev,
            aiAgents: prev.aiAgents.map(a => 
              a.id === agent.id 
                ? { ...a, lastMessageTime: Date.now(), messageCount: (a.messageCount || 0) + 1 }
                : a
            )
          }));
        } else {
          console.log(`Skipping first message for ${agent.name} - phase: ${state.phase}, time remaining: ${state.timeRemaining}`);
        }
      }, baseDelay);
      
      // Schedule recurring messages
      const recurringTimer = window.setInterval(() => {
        console.log(`Recurring message timer triggered for ${agent.name}`);
        if (state.phase === 'discussion' && state.timeRemaining > 10) {
          const shouldSendMessage = Math.random() < 0.8; // 80% chance to send message
          if (shouldSendMessage) {
            const isDefensive = agent.trustLevel < 50 || Math.random() < 0.3;
            const message: ChatMessage = {
              id: `ai-${agent.id}-${Date.now()}`,
              sender: agent.name,
              message: generateAIMessage(agent, state.discussionTopic, state.currentRound, isDefensive),
              timestamp: Date.now(),
              isAI: true,
              agentId: agent.id
            };
            
            console.log(`Adding recurring message from ${agent.name}:`, message.message);
            setCurrentMessages(prev => [...prev, message]);
            
            setGameState(prev => ({
              ...prev,
              aiAgents: prev.aiAgents.map(a => 
                a.id === agent.id 
                  ? { ...a, lastMessageTime: Date.now(), messageCount: (a.messageCount || 0) + 1 }
                  : a
              )
            }));
          } else {
            console.log(`Skipping recurring message for ${agent.name} - random chance`);
          }
        } else {
          console.log(`Skipping recurring message for ${agent.name} - phase: ${state.phase}, time remaining: ${state.timeRemaining}`);
        }
      }, messageInterval);
      
      setMessageTimers(prev => ({ 
        ...prev, 
        [`${agent.id}_first`]: firstMessageTimer,
        [`${agent.id}_recurring`]: recurringTimer
      }));
    });
  }, [gameState, generateAIMessage]);

  // Calculate payoffs for pairwise interactions
  const calculatePayoff = useCallback((humanChoice: 'cooperate' | 'defect', aiChoice: 'cooperate' | 'defect') => {
    const key = `${humanChoice}-${aiChoice}` as keyof typeof PAYOFF_MATRIX;
    return PAYOFF_MATRIX[key];
  }, []);

  // Start discussion phase with proper duration - FIXED
  const startDiscussion = useCallback((discussionDuration: number = 60) => {
    console.log('Starting discussion phase...');
    console.log('Current game state:', gameState);
    
    const topic = DISCUSSION_TOPICS[Math.floor(Math.random() * DISCUSSION_TOPICS.length)];
    
    // Clear existing messages and timers
    setCurrentMessages([]);
    Object.values(messageTimers).forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    setMessageTimers({});
    
    // Update game state first
    setGameState(prev => {
      console.log('Updating game state for discussion phase');
      return {
        ...prev,
        phase: 'discussion',
        discussionTopic: topic,
        timeRemaining: discussionDuration
      };
    });
    
    // Schedule AI messages immediately
    console.log('Scheduling AI messages...');
    scheduleAIMessages();
  }, [scheduleAIMessages, messageTimers, gameState]);

  // Make decision with enhanced logic and educational insights
  const makeDecision = useCallback((humanChoice: 'cooperate' | 'defect') => {
    const humanHistory = gameState.rounds.map(r => r.humanChoice).filter(Boolean) as ('cooperate' | 'defect')[];
    
    const aiChoices: Record<string, 'cooperate' | 'defect'> = {};
    const payoffs: Record<string, number> = {};
    const individualPayoffs: Record<string, { human: number; ai: number }> = {};
    let totalHumanPayoff = 0;

    // Calculate pairwise interactions
    gameState.aiAgents.forEach(agent => {
      const aiChoice = getAIDecision(agent, gameState.currentRound, humanHistory, gameState.rounds);
      aiChoices[agent.id] = aiChoice;
      
      const pairwisePayoff = calculatePayoff(humanChoice, aiChoice);
      payoffs[agent.id] = pairwisePayoff.ai;
      individualPayoffs[agent.id] = pairwisePayoff;
      totalHumanPayoff += pairwisePayoff.human;
    });

    // Detect game theory events and generate insights
    let event: string | undefined;
    let strategicInsight: string | undefined;
    const allCooperated = Object.values(aiChoices).every(choice => choice === 'cooperate') && humanChoice === 'cooperate';
    const allDefected = Object.values(aiChoices).every(choice => choice === 'defect') && humanChoice === 'defect';
    const humanDefectedFirstTime = humanChoice === 'defect' && !humanHistory.includes('defect');
    
    if (allCooperated) {
      event = 'Nash Equilibrium';
      strategicInsight = EDUCATIONAL_INSIGHTS['Nash Equilibrium'];
    } else if (allDefected) {
      event = 'Mutual Defection';
      strategicInsight = EDUCATIONAL_INSIGHTS['Cooperation Breakdown'];
    } else if (humanDefectedFirstTime) {
      event = 'Grim Trigger';
      strategicInsight = EDUCATIONAL_INSIGHTS['Grim Trigger'];
    }

    // Generate reflection prompt for educational mode
    const reflectionPrompt = gameState.gameConfig?.educationalMode ? 
      REFLECTION_PROMPTS[Math.floor(Math.random() * REFLECTION_PROMPTS.length)] : undefined;

    const newRound: GameRound = {
      round: gameState.currentRound,
      humanChoice,
      aiChoices,
      payoffs,
      humanPayoff: totalHumanPayoff,
      cumulativePayoff: gameState.rounds.reduce((sum, r) => sum + r.humanPayoff, 0) + totalHumanPayoff,
      discussion: currentMessages,
      event,
      individualPayoffs,
      strategicInsight,
      reflectionPrompt
    };

    // Update AI trust levels and track concepts
    const updatedAgents = gameState.aiAgents.map(agent => {
      const trustChange = humanChoice === 'cooperate' ? 
        Math.min(15, Math.max(5, 20 - agent.trustLevel * 0.1)) : 
        Math.max(-25, Math.min(-10, -30 + agent.trustLevel * 0.2));
      
      return {
        ...agent,
        trustLevel: Math.max(0, Math.min(100, agent.trustLevel + trustChange)),
        hasDefectedBefore: agent.hasDefectedBefore || humanChoice === 'defect'
      };
    });

    // Track encountered concepts
    const newConcepts = [...(gameState.conceptsEncountered || [])];
    if (event && !newConcepts.includes(event)) {
      newConcepts.push(event);
    }

    // Clear message timers
    Object.values(messageTimers).forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    setMessageTimers({});

    setGameState(prev => ({
      ...prev,
      phase: 'results',
      rounds: [...prev.rounds, newRound],
      aiAgents: updatedAgents,
      conceptsEncountered: newConcepts
    }));
  }, [gameState, currentMessages, getAIDecision, calculatePayoff, messageTimers]);

  // Add human message - FIXED
  const addMessage = useCallback((message: string) => {
    const newMessage: ChatMessage = {
      id: `human-${Date.now()}`,
      sender: 'You',
      message,
      timestamp: Date.now(),
      isAI: false
    };
    
    console.log('Adding human message:', message);
    setCurrentMessages(prev => {
      const updated = [...prev, newMessage];
      console.log('Updated messages:', updated);
      return updated;
    });
  }, []);

  // Timer effect for discussion phase
  useEffect(() => {
    if (gameState.phase === 'discussion' && gameState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);

      return () => clearInterval(timer);
    } else if (gameState.phase === 'discussion' && gameState.timeRemaining === 0) {
      // Clear all message timers when discussion ends
      Object.values(messageTimers).forEach(timer => {
        clearTimeout(timer);
        clearInterval(timer);
      });
      setMessageTimers({});
      setGameState(prev => ({ ...prev, phase: 'decision' }));
    }
  }, [gameState.phase, gameState.timeRemaining, messageTimers]);

  // Continue to next round with stochastic ending support
  const nextRound = useCallback(() => {
    const config = gameState.gameConfig;
    const isStochastic = config?.gameMode === 'stochastic';
    const maxRounds = config?.maxRounds || 10;
    
    // Check for game end
    if (isStochastic) {
      if (gameState.currentRound >= 3 && Math.random() < 0.05) {
        setGameState(prev => ({
          ...prev,
          phase: 'debrief',
          isGameEnded: true
        }));
        return;
      }
    } else {
      if (gameState.currentRound >= maxRounds) {
        setGameState(prev => ({
          ...prev,
          phase: 'debrief',
          isGameEnded: true
        }));
        return;
      }
    }

    // Clear existing messages and timers
    setCurrentMessages([]);
    Object.values(messageTimers).forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    setMessageTimers({});

    // Continue to next round
    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      phase: 'discussion',
      timeRemaining: config?.discussionTime || 60
    }));
    
    // Schedule AI messages after a short delay to ensure state is updated
    setTimeout(() => {
      scheduleAIMessages();
    }, 1000);
  }, [gameState.currentRound, gameState.gameConfig, messageTimers, scheduleAIMessages]);

  // Toggle graph display mode
  const toggleGraphMode = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showPerRoundPayoff: !prev.showPerRoundPayoff
    }));
  }, []);

  return {
    gameState,
    currentMessages,
    createAIAgents,
    startDiscussion,
    makeDecision,
    addMessage,
    nextRound,
    toggleGraphMode,
    setGameState,
    scheduleAIMessages
  };
}