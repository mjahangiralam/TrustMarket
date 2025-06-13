import React from 'react';
import { GameSetup } from './components/GameSetup';
import { DiscussionPhase } from './components/DiscussionPhase';
import { DecisionPhase } from './components/DecisionPhase';
import { ResultsPhase } from './components/ResultsPhase';
import { GameDebrief } from './components/GameDebrief';
import { useGameLogic } from './hooks/useGameLogic';
import { GameConfig } from './types/game';

function App() {
  const {
    gameState,
    currentMessages,
    createAIAgents,
    startDiscussion,
    makeDecision,
    addMessage,
    nextRound,
    toggleGraphMode,
    setGameState
  } = useGameLogic();

  const handleStartGame = (config: GameConfig) => {
    const aiAgents = createAIAgents(config.aiAgentCount);
    
    setGameState(prev => ({
      ...prev,
      phase: 'discussion',
      aiAgents,
      gameConfig: config,
      currentRound: 1,
      rounds: [],
      isGameEnded: false,
      conceptsEncountered: []
    }));
    
    startDiscussion(config.discussionTime);
  };

  const handlePlayAgain = () => {
    const config = gameState.gameConfig;
    if (!config) return;
    
    const aiAgents = createAIAgents(config.aiAgentCount);
    
    setGameState({
      phase: 'setup',
      currentRound: 1,
      rounds: [],
      aiAgents,
      discussionTopic: '',
      timeRemaining: config.discussionTime,
      isGameEnded: false,
      gameConfig: config,
      showPerRoundPayoff: false,
      conceptsEncountered: []
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
          onToggleGraphMode={toggleGraphMode}
        />
      );
    
    default:
      return <GameSetup onStartGame={handleStartGame} />;
  }
}

export default App;