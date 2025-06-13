import { useState, useCallback, useEffect } from 'react';
import { GameState, GameRound, AIAgent, ChatMessage, GameConfig } from '../types/game';
import { AI_AGENTS, DISCUSSION_TOPICS, PAYOFF_MATRIX } from '../data/gameData';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    currentRound: 1,
    rounds: [],
    aiAgents: AI_AGENTS.slice(0, 3),
    discussionTopic: DISCUSSION_TOPICS[0],
    timeRemaining: 60,
    isGameEnded: false
  });

  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);

  // Enhanced AI decision making with proper strategy implementation
  const getAIDecision = useCallback((agent: AIAgent, round: number, humanHistory: ('cooperate' | 'defect')[], allRounds: GameRound[]): 'cooperate' | 'defect' => {
    const lastHumanMove = humanHistory[humanHistory.length - 1];
    
    switch (agent.strategy) {
      case 'Tit-for-Tat':
        // Cooperate on first round, then mirror human's last move
        return round === 1 ? 'cooperate' : lastHumanMove;
      
      case 'Grim Trigger':
        // Cooperate until first human defection, then defect permanently
        return humanHistory.includes('defect') ? 'defect' : 'cooperate';
      
      case 'Opportunistic':
        // Consider trust level and potential payoff
        const trustThreshold = 50;
        const defectionProbability = agent.trustLevel < trustThreshold ? 0.7 : 0.3;
        
        // More likely to defect if trust is low or if human defected recently
        if (lastHumanMove === 'defect' && Math.random() < 0.8) return 'defect';
        if (agent.trustLevel < 30 && Math.random() < defectionProbability) return 'defect';
        
        return Math.random() < defectionProbability ? 'defect' : 'cooperate';
      
      case 'Nash Equilibrium Seeker':
        // Analyze patterns and seek optimal mutual strategy
        const cooperateRate = humanHistory.filter(move => move === 'cooperate').length / humanHistory.length;
        
        // If human cooperates frequently, cooperate back
        if (cooperateRate > 0.6) return 'cooperate';
        
        // If human defects frequently, try to establish equilibrium
        if (cooperateRate < 0.3) return Math.random() < 0.5 ? 'defect' : 'cooperate';
        
        // Mixed strategy for uncertain patterns
        return Math.random() < 0.6 ? 'cooperate' : 'defect';
      
      case 'Adaptive Mirroring':
        // Learn from patterns and adapt
        if (round <= 2) return 'cooperate';
        
        const recentMoves = humanHistory.slice(-3);
        const recentCooperateRate = recentMoves.filter(move => move === 'cooperate').length / recentMoves.length;
        
        return recentCooperateRate > 0.5 ? 'cooperate' : 'defect';
      
      default:
        return 'cooperate';
    }
  }, []);

  // Generate AI chat message based on personality and context
  const generateAIMessage = useCallback((agent: AIAgent, topic: string, round: number): string => {
    const responses = {
      'loyalist': [
        "I believe cooperation builds stronger foundations for everyone involved.",
        "Trust is earned through consistency, not just words.",
        "Short-term gains often lead to long-term losses in relationships.",
        "We should focus on mutual benefit rather than individual advantage."
      ],
      'cynic': [
        "History shows that self-interest usually trumps cooperation.",
        "Trust is a luxury we can't afford in competitive environments.",
        "Those who cooperate first are often the first to be exploited.",
        "I've learned to expect betrayal - it's safer that way."
      ],
      'opportunist': [
        "The key is adapting your strategy based on what others do.",
        "Sometimes you need to take risks to maximize your position.",
        "Every situation is unique - rigid strategies often fail.",
        "I'm watching everyone's moves carefully before deciding."
      ],
      'strategist': [
        "The optimal strategy depends on the game's structure and opponents.",
        "Pattern recognition is crucial for long-term success.",
        "Equilibrium strategies provide stability but may not maximize payoff.",
        "I'm analyzing the meta-game here - very interesting dynamics."
      ],
      'mirror': [
        "I learn from observing how others behave in these situations.",
        "Adaptation is key - what worked before might not work now.",
        "I'm studying the patterns emerging in our interactions.",
        "Flexibility in strategy often beats rigid approaches."
      ]
    };
    
    const agentResponses = responses[agent.id as keyof typeof responses] || responses['loyalist'];
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  }, []);

  // Calculate payoffs for pairwise interactions
  const calculatePayoff = useCallback((humanChoice: 'cooperate' | 'defect', aiChoice: 'cooperate' | 'defect') => {
    const key = `${humanChoice}-${aiChoice}` as keyof typeof PAYOFF_MATRIX;
    return PAYOFF_MATRIX[key];
  }, []);

  // Start discussion phase with proper duration
  const startDiscussion = useCallback((discussionDuration: number = 60) => {
    const topic = DISCUSSION_TOPICS[Math.floor(Math.random() * DISCUSSION_TOPICS.length)];
    setGameState(prev => ({
      ...prev,
      phase: 'discussion',
      discussionTopic: topic,
      timeRemaining: discussionDuration
    }));
    setCurrentMessages([]);
    
    // Add AI messages with staggered timing
    setTimeout(() => {
      gameState.aiAgents.forEach((agent, index) => {
        setTimeout(() => {
          const message: ChatMessage = {
            id: `ai-${agent.id}-${Date.now()}-${index}`,
            sender: agent.name,
            message: generateAIMessage(agent, topic, gameState.currentRound),
            timestamp: Date.now(),
            isAI: true
          };
          setCurrentMessages(prev => [...prev, message]);
        }, (index + 1) * 2000);
      });
    }, 1000);
  }, [gameState.aiAgents, gameState.currentRound, generateAIMessage]);

  // Make decision with enhanced pairwise logic
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

    // Detect game theory events
    let event: string | undefined;
    const allCooperated = Object.values(aiChoices).every(choice => choice === 'cooperate') && humanChoice === 'cooperate';
    const allDefected = Object.values(aiChoices).every(choice => choice === 'defect') && humanChoice === 'defect';
    const humanDefectedFirstTime = humanChoice === 'defect' && !humanHistory.includes('defect');
    
    if (allCooperated) event = 'Nash Equilibrium';
    else if (allDefected) event = 'Mutual Defection';
    else if (humanDefectedFirstTime) event = 'Grim Trigger';

    const newRound: GameRound = {
      round: gameState.currentRound,
      humanChoice,
      aiChoices,
      payoffs,
      humanPayoff: totalHumanPayoff,
      cumulativePayoff: gameState.rounds.reduce((sum, r) => sum + r.humanPayoff, 0) + totalHumanPayoff,
      discussion: currentMessages,
      event,
      individualPayoffs
    };

    // Update AI trust levels based on human choice
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

    setGameState(prev => ({
      ...prev,
      phase: 'results',
      rounds: [...prev.rounds, newRound],
      aiAgents: updatedAgents
    }));
  }, [gameState, currentMessages, getAIDecision, calculatePayoff]);

  // Add human message
  const addMessage = useCallback((message: string) => {
    const newMessage: ChatMessage = {
      id: `human-${Date.now()}`,
      sender: 'You',
      message,
      timestamp: Date.now(),
      isAI: false
    };
    setCurrentMessages(prev => [...prev, newMessage]);
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
      setGameState(prev => ({ ...prev, phase: 'decision' }));
    }
  }, [gameState.phase, gameState.timeRemaining]);

  // Continue to next round with stochastic ending support
  const nextRound = useCallback(() => {
    const config = gameState.gameConfig;
    const isStochastic = config?.gameMode === 'stochastic';
    const maxRounds = config?.maxRounds || 10;
    
    // Check for game end
    if (isStochastic) {
      // 5% chance to end each round after round 3
      if (gameState.currentRound >= 3 && Math.random() < 0.05) {
        setGameState(prev => ({
          ...prev,
          phase: 'debrief',
          isGameEnded: true
        }));
        return;
      }
    } else {
      // Finite game mode
      if (gameState.currentRound >= maxRounds) {
        setGameState(prev => ({
          ...prev,
          phase: 'debrief',
          isGameEnded: true
        }));
        return;
      }
    }

    // Continue to next round
    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      phase: 'discussion',
      timeRemaining: config?.discussionTime || 60
    }));
    
    startDiscussion(config?.discussionTime || 60);
  }, [gameState.currentRound, gameState.gameConfig, startDiscussion]);

  return {
    gameState,
    currentMessages,
    startDiscussion,
    makeDecision,
    addMessage,
    nextRound,
    setGameState
  };
}