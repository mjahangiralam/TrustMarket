import React from 'react';
import { TrendingUp, TrendingDown, Users, ArrowRight, Brain, Eye } from 'lucide-react';
import { GameRound, AIAgent } from '../types/game';

interface ResultsPhaseProps {
  round: GameRound;
  aiAgents: AIAgent[];
  onContinue: () => void;
  educationalMode?: boolean;
}

export function ResultsPhase({ round, aiAgents, onContinue, educationalMode = false }: ResultsPhaseProps) {
  const getChoiceColor = (choice: 'cooperate' | 'defect') => {
    return choice === 'cooperate' ? 'text-green-400' : 'text-red-400';
  };

  const getChoiceIcon = (choice: 'cooperate' | 'defect') => {
    return choice === 'cooperate' ? '🤝' : '⚔️';
  };

  const getTrustChange = (choice: 'cooperate' | 'defect') => {
    return choice === 'cooperate' ? '+5 to +15' : '-10 to -25';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Round {round.round} Results</h2>
          <p className="text-xl text-slate-300">See how your strategy played out</p>
        </div>

        {/* Main Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Your Results */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">Your Performance</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="text-6xl mr-4">{getChoiceIcon(round.humanChoice!)}</span>
                <div>
                  <p className="text-lg text-slate-300">You chose to</p>
                  <p className={`text-3xl font-bold ${getChoiceColor(round.humanChoice!)}`}>
                    {round.humanChoice!.charAt(0).toUpperCase() + round.humanChoice!.slice(1)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Round Payoff:</span>
                  <span className="text-2xl font-bold text-white">+{round.humanPayoff}</span>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Cumulative Score:</span>
                  <span className="text-2xl font-bold text-green-400">
                    {round.cumulativePayoff}
                    <TrendingUp className="w-5 h-5 inline ml-2" />
                  </span>
                </div>
              </div>
              
              {/* Individual Pairwise Results */}
              {round.individualPayoffs && (
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Pairwise Results:</h4>
                  <div className="space-y-2">
                    {Object.entries(round.individualPayoffs).map(([agentId, payoff]) => {
                      const agent = aiAgents.find(a => a.id === agentId);
                      return (
                        <div key={agentId} className="flex justify-between text-sm">
                          <span className="text-slate-300">vs {agent?.name}:</span>
                          <span className="text-white">+{payoff.human}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Results */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">AI Agent Choices</h3>
            <div className="space-y-4">
              {aiAgents.map((agent) => {
                const choice = round.aiChoices[agent.id];
                const payoff = round.payoffs[agent.id];
                return (
                  <div key={agent.id} className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{agent.avatar}</span>
                        <div>
                          <p className="font-semibold text-white">{agent.name}</p>
                          <p className={`text-sm ${getChoiceColor(choice)}`}>
                            {choice.charAt(0).toUpperCase() + choice.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-300 text-sm">Earned</p>
                        <p className="text-xl font-bold text-white">+{payoff}</p>
                      </div>
                    </div>
                    
                    {/* Strategy Reveal */}
                    <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-slate-600">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1 text-slate-400" />
                        <span className="text-slate-400">Strategy:</span>
                      </div>
                      <span className="text-slate-300 font-medium">{agent.strategy}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust Changes */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3" />
            Trust Level Changes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {aiAgents.map((agent) => {
              const trustChange = getTrustChange(round.humanChoice!);
              const isPositive = round.humanChoice === 'cooperate';
              return (
                <div key={agent.id} className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">{agent.name}</span>
                    <span className="text-2xl">{agent.avatar}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Trust:</span>
                    <div className="flex items-center">
                      <span className={`font-bold ${
                        agent.trustLevel > 70 ? 'text-green-400' :
                        agent.trustLevel > 40 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {agent.trustLevel}%
                      </span>
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-400 ml-2" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400 ml-2" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    Change: {trustChange}
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        agent.trustLevel > 70
                          ? 'bg-green-500'
                          : agent.trustLevel > 40
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${agent.trustLevel}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Game Theory Insight */}
        {round.event && (
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-6 mb-8">
            <h4 className="text-purple-300 font-semibold mb-2 flex items-center">
              🧠 Game Theory Insight: {round.event}
            </h4>
            <p className="text-slate-300 text-sm">
              {round.event === 'Nash Equilibrium' && 
                'A stable state where no player can improve their outcome by unilaterally changing strategy.'}
              {round.event === 'Grim Trigger' && 
                'AI agents have switched to permanent retaliation after detecting betrayal.'}
              {round.event === 'Mutual Defection' && 
                'All players chose defection, resulting in suboptimal outcomes for everyone.'}
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={onContinue}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center mx-auto"
          >
            Continue to Next Round
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}