import React from 'react';
import { GameSetup } from './components/GameSetup';
import { DiscussionPhase } from './components/DiscussionPhase';
import { DecisionPhase } from './components/DecisionPhase';
import { ResultsPhase } from './components/ResultsPhase';
import { GameDebrief } from './components/GameDebrief';
import { useGameLogic } from './hooks/useGameLogic';
import { GameConfig } from './types/game';
import { AI_AGENTS } from './data/gameData';

function App() {
  const {
    gameState,
    currentMessages,
    startDiscussion,
    makeDecision,
    addMessage,
    nextRound,
    setGameState
  } = useGameLogic();

  const handleStartGame = (config: GameConfig) => {
    setGameState(prev => ({
      ...prev,
      phase: 'discussion',
      aiAgents: AI_AGENTS.slice(0, config.aiAgentCount).map(agent => ({ 
        ...agent, 
        trustLevel: 70,
        hasDefectedBefore: false 
      })),
      gameConfig: config
    }));
    startDiscussion(config.discussionTime);
  };

  const handlePlayAgain = () => {
    const config = gameState.gameConfig;
    setGameState({
      phase: 'setup',
      currentRound: 1,
      rounds: [],
      aiAgents: AI_AGENTS.slice(0, config?.aiAgentCount || 3).map(agent => ({ 
        ...agent, 
        trustLevel: 70,
        hasDefectedBefore: false 
      })),
      discussionTopic: '',
      timeRemaining: config?.discussionTime || 60,
      isGameEnded: false,
      gameConfig: config
    });
  };

  switch (gameState.phase) {
    case 'setup':
      return <GameSetup onStartGame={handleStartGame} />;
    
    case 'discussion':
      return (
        <DiscussionPhase
          topic={gameState.discussionTopic}
          messages={currentMessages}
          timeRemaining={gameState.timeRemaining}
          aiAgents={gameState.aiAgents}
          onAddMessage={addMessage}
          onTimeUp={() => setGameState(prev => ({ ...prev, phase: 'decision' }))}
          educationalMode={gameState.gameConfig?.educationalMode}
        />
      );
    
    case 'decision':
      return (
        <DecisionPhase
          currentRound={gameState.currentRound}
          aiAgents={gameState.aiAgents}
          onMakeDecision={makeDecision}
        />
      );
    
    case 'results':
      const currentRound = gameState.rounds[gameState.rounds.length - 1];
      return (
        <ResultsPhase
          round={currentRound}
          aiAgents={gameState.aiAgents}
          onContinue={nextRound}
          educationalMode={gameState.gameConfig?.educationalMode}
        />
      );
    
    case 'debrief':
      return (
        <GameDebrief
          gameState={gameState}
          onPlayAgain={handlePlayAgain}
        />
      );
    
    default:
      return <GameSetup onStartGame={handleStartGame} />;
  }
}

export default App;