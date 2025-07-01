import React from 'react';
import { Users, Clock, Brain, Settings, Infinity, MessageCircle } from 'lucide-react';
import { GameConfig } from '../types/game';
import { ApiKeySetup } from './ApiKeySetup';

interface GameSetupProps {
  onStartGame: (config: GameConfig) => void;
}

export function GameSetup({ onStartGame }: GameSetupProps) {
  const [config, setConfig] = React.useState<GameConfig>({
    maxRounds: 10,
    discussionTime: 60,
    aiAgentCount: 3,
    educationalMode: true,
    gameMode: 'finite',
    discussionTopicCategory: 'all',
    elevenLabsKey: '',
    aiPersonalityKey: ''
  });

  const [playerName, setPlayerName] = React.useState('');

  const handleApiKeysSubmit = (keys: { elevenLabsKey: string; aiPersonalityKey: string }) => {
    setConfig(prev => ({
      ...prev,
      elevenLabsKey: keys.elevenLabsKey,
      aiPersonalityKey: keys.aiPersonalityKey
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame({ ...config, playerName: playerName.trim() || 'You' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">The Trust Market</h1>
            <p className="text-xl text-slate-300 mb-2">A Game of Strategy, Conversation, and Betrayal</p>
            <p className="text-lg text-slate-400 italic">"Talk. Trust. Betray. Repeat."</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-white font-medium mb-3">
                    <Users className="w-5 h-5 mr-2" />
                    AI Opponents
                  </label>
                  <select
                    value={config.aiAgentCount}
                    onChange={(e) => setConfig(prev => ({ ...prev, aiAgentCount: parseInt(e.target.value) }))}
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value={1}>1 AI Agent</option>
                    <option value={2}>2 AI Agents</option>
                    <option value={3}>3 AI Agents</option>
                    <option value={4}>4 AI Agents</option>
                    <option value={5}>5 AI Agents</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-white font-medium mb-3">
                    <Clock className="w-5 h-5 mr-2" />
                    Discussion Time
                  </label>
                  <select
                    value={config.discussionTime}
                    onChange={(e) => setConfig(prev => ({ ...prev, discussionTime: parseInt(e.target.value) }))}
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value={30}>30 seconds</option>
                    <option value={60}>60 seconds</option>
                    <option value={90}>90 seconds</option>
                    <option value={120}>2 minutes</option>
                    <option value={180}>3 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-white font-medium mb-3">
                    <Infinity className="w-5 h-5 mr-2" />
                    Game Mode
                  </label>
                  <select
                    value={config.gameMode}
                    onChange={(e) => setConfig(prev => ({ ...prev, gameMode: e.target.value as 'finite' | 'stochastic' }))}
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="finite">Finite Rounds</option>
                    <option value="stochastic">Stochastic End</option>
                  </select>
                </div>

                {config.gameMode === 'finite' && (
                  <div>
                    <label className="flex items-center text-white font-medium mb-3">
                      <Clock className="w-5 h-5 mr-2" />
                      Max Rounds
                    </label>
                    <select
                      value={config.maxRounds}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxRounds: parseInt(e.target.value) }))}
                      className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value={5}>5 Rounds</option>
                      <option value={10}>10 Rounds</option>
                      <option value={15}>15 Rounds</option>
                      <option value={20}>20 Rounds</option>
                      <option value={25}>25 Rounds</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="flex items-center text-white font-medium mb-3">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Discussion Topics
                  </label>
                  <select
                    value={config.discussionTopicCategory}
                    onChange={(e) => setConfig(prev => ({ ...prev, discussionTopicCategory: e.target.value as any }))}
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="all">All Topics (Mixed Variety)</option>
                    <option value="beginner">Beginner (Basic Concepts)</option>
                    <option value="intermediate">Intermediate (Strategic Thinking)</option>
                    <option value="advanced">Advanced (Complex Scenarios)</option>
                    <option value="philosophical">Philosophical (Deep Questions)</option>
                    <option value="realWorld">Real-World Applications</option>
                    <option value="psychological">Psychological (Human Behavior)</option>
                  </select>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose the type of discussion topics you'll encounter during the game
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-white font-medium mb-3">
                    <Users className="w-5 h-5 mr-2" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={e => setPlayerName(e.target.value)}
                    placeholder="Enter your name (optional)"
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 mb-2"
                  />
                  <p className="text-xs text-slate-400 mt-1">Personalize your experience by adding your name</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-white font-medium mb-3">
                    <Settings className="w-5 h-5 mr-2" />
                    Game Features
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.educationalMode}
                        onChange={(e) => setConfig(prev => ({ ...prev, educationalMode: e.target.checked }))}
                        className="mr-3 rounded text-blue-600 bg-slate-800 border-slate-600"
                      />
                      <span className="text-white">Educational Mode</span>
                      <span className="text-slate-400 text-sm ml-2">(Strategy explanations & concept popups)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">How to Play</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
                  <div className="bg-blue-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-300 mb-2">Discussion Phase</h4>
                    <p>Engage in philosophical debates with AI agents before making strategic decisions.</p>
                  </div>
                  <div className="bg-green-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-300 mb-2">Decision Phase</h4>
                    <p>Choose to Cooperate or Defect based on your strategy and the discussion.</p>
                  </div>
                  <div className="bg-purple-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-300 mb-2">Results Phase</h4>
                    <p>See payoffs and how your choices affected AI trust levels and future behavior.</p>
                  </div>
                </div>
                
                {config.gameMode === 'stochastic' && (
                  <div className="mt-4 bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Stochastic Mode</h4>
                    <p className="text-slate-300 text-sm">
                      The game can end unexpectedly after round 3 (5% chance each round). 
                      Plan your strategy accordingly!
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start The Trust Market
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center">
          <ApiKeySetup onApiKeysSubmit={handleApiKeysSubmit} />
        </div>
      </div>
    </div>
  );
}