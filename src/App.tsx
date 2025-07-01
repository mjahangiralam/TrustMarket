import React, { useEffect } from 'react';
import { GameSetup } from './components/GameSetup';
import { DiscussionPhase } from './components/DiscussionPhase';
import { DecisionPhase } from './components/DecisionPhase';
import { ResultsPhase } from './components/ResultsPhase';
import { GameDebrief } from './components/GameDebrief';
import { useGameLogic } from './hooks/useGameLogic';
import { GameConfig, GameState } from './types/game';
import { getDiscussionTopics } from './data/gameData';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

function LandingPage() {
  useEffect(() => {
    sessionStorage.removeItem('canEnterGame');
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center mr-6">
            <span className="text-white text-4xl font-bold">AI</span>
          </div>
          <span className="text-5xl font-extrabold text-slate-800">AiEconLab</span>
        </div>
      </div>
      <img src="/images/TrustMarket_wider.png" alt="TrustMarket" className="max-w-7xl w-full rounded-2xl shadow-2xl mb-12" />
      <Link to="/game" onClick={() => sessionStorage.setItem('canEnterGame', 'true')}>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-xl text-2xl shadow-lg transition-all duration-200 transform hover:scale-105">
          Enter The Trust Market Game
        </button>
      </Link>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if (window.location.pathname !== '/') {
      window.location.replace('/');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<MainGameApp />} />
      </Routes>
    </Router>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-12 pb-6 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-700 pb-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mr-3">
              <span className="text-white text-lg font-bold">AI</span>
            </div>
            <span className="text-2xl font-extrabold text-white">AiEconLab</span>
          </div>
          <p className="text-slate-400 mb-4 text-sm">
            Trust Market is an interactive game and experiment by AiEconLab, designed to explore trust, cooperation, and strategy in social dilemmas. Play, learn, and discover the dynamics of trust in a fun, educational environment.
          </p>
          <div className="flex space-x-4 text-slate-400">
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400"><svg width="20" height="20" fill="currentColor"><path d="M17 17h-3v-4c0-1-.5-2-2-2s-2 1-2 2v4H7V7h3v1c.5-.7 1.5-1 2.5-1 2 0 3.5 1.3 3.5 4v6zM5 5a2 2 0 11.001-4.001A2 2 0 015 5zm-1.5 12h3V7h-3v10z"/></svg></a>
            <a href="#" aria-label="YouTube" className="hover:text-red-400"><svg width="20" height="20" fill="currentColor"><path d="M10 3c2.5 0 7 .2 7 .2s.7.1 1 .7c.3.6.3 1.8.3 1.8s.1 1.2.1 2.3v2c0 1.1-.1 2.3-.1 2.3s0 1.2-.3 1.8c-.3.6-1 .7-1 .7s-4.5.2-7 .2-7-.2-7-.2-.7-.1-1-.7C.1 13.2.1 12 .1 12S0 10.8 0 9.7v-2C0 6.6.1 5.4.1 5.4s0-1.2.3-1.8C.7 3.3 1.4 3.2 1.4 3.2S5.9 3 8.4 3H10zm-2 3.5v6l5-3-5-3z"/></svg></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400"><svg width="20" height="20" fill="currentColor"><path d="M20 3.9a8.2 8.2 0 01-2.4.7A4.1 4.1 0 0019.4 2a8.2 8.2 0 01-2.6 1A4.1 4.1 0 009.8 6.1c0 .3 0 .6.1.9A11.7 11.7 0 013 2.6a4.1 4.1 0 001.3 5.5A4.1 4.1 0 012 7.1v.1a4.1 4.1 0 003.3 4A4.1 4.1 0 012 11.2a4.1 4.1 0 003.8 2.8A8.2 8.2 0 012 16.1a11.7 11.7 0 006.3 1.8c7.5 0 11.6-6.2 11.6-11.6v-.5A8.2 8.2 0 0020 3.9z"/></svg></a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li><a href="#" className="hover:text-blue-400">About</a></li>
            <li><a href="#" className="hover:text-blue-400">How to Play</a></li>
            <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Accessibility</a></li>
            <li><a href="#" className="hover:text-blue-400">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 pb-2 border-t border-slate-600 mt-8 text-slate-300 text-sm font-medium">
        <div className="mb-2 md:mb-0">Contact: <a href="mailto:info@aieconlab.com" className="hover:text-blue-400 underline">info@aieconlab.com</a> | <a href="tel:+1234567890" className="hover:text-blue-400 underline">+1 (234) 567-890</a></div>
        <div>© 2025 AiEconLab. All rights reserved.</div>
      </div>
    </footer>
  );
}

function MainGameApp() {
  const {
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
  } = useGameLogic();

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== '/game') {
      navigate('/');
    }
    if (!sessionStorage.getItem('canEnterGame')) {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  const handleStartGame = (config: GameConfig) => {
    console.log('Starting game with config:', config);
    const aiAgents = createAIAgents(config.aiAgentCount);
    console.log('Created AI agents:', aiAgents);
    
    // Set the game state and start discussion in a single state update
    setGameState(prev => {
      const newState: GameState = {
        ...prev,
        phase: 'discussion',
        aiAgents,
        gameConfig: config,
        currentRound: 1,
        rounds: [],
        isGameEnded: false,
        conceptsEncountered: [],
        discussionTopic: getDiscussionTopics(config.discussionTopicCategory)[Math.floor(Math.random() * getDiscussionTopics(config.discussionTopicCategory).length)],
        timeRemaining: config.discussionTime
      };
      
      // Schedule AI messages after state is updated
      requestAnimationFrame(() => {
        console.log('Starting discussion with state:', newState);
        scheduleAIMessages(newState);
      });
      
      return newState;
    });
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
      return <><GameSetup onStartGame={handleStartGame} /><Footer /></>;
    
    case 'discussion':
      return <><DiscussionPhase
        topic={gameState.discussionTopic}
        messages={currentMessages}
        timeRemaining={gameState.timeRemaining}
        aiAgents={gameState.aiAgents}
        onAddMessage={addMessage}
        onTimeUp={() => setGameState(prev => ({ ...prev, phase: 'decision' }))}
        educationalMode={gameState.gameConfig?.educationalMode}
        elevenLabsKey={gameState.gameConfig?.elevenLabsKey}
      /><Footer /></>;
    
    case 'decision':
      return <><DecisionPhase
        currentRound={gameState.currentRound}
        aiAgents={gameState.aiAgents}
        onMakeDecision={makeDecision}
      /><Footer /></>;
    
    case 'results':
      const currentRound = gameState.rounds[gameState.rounds.length - 1];
      return <><ResultsPhase
        round={currentRound}
        aiAgents={gameState.aiAgents}
        onContinue={nextRound}
        educationalMode={gameState.gameConfig?.educationalMode}
      /><Footer /></>;
    
    case 'debrief':
      return <><GameDebrief
        gameState={gameState}
        onPlayAgain={handlePlayAgain}
        onToggleGraphMode={toggleGraphMode}
      /><Footer /></>;
    
    default:
      return <><GameSetup onStartGame={handleStartGame} /><Footer /></>;
  }
}