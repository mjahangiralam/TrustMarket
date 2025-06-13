import React from 'react';
import { Award, Brain, Users, TrendingUp, Eye, Target, Table } from 'lucide-react';
import { GameState } from '../types/game';
import { GameChart } from './GameChart';

interface GameDebriefProps {
  gameState: GameState;
  onPlayAgain: () => void;
}

export function GameDebrief({ gameState, onPlayAgain }: GameDebriefProps) {
  const totalScore = gameState.rounds.reduce((sum, round) => sum + round.humanPayoff, 0);
  const cooperationRate = (gameState.rounds.filter(r => r.humanChoice === 'cooperate').length / gameState.rounds.length) * 100;
  const avgRoundScore = totalScore / gameState.rounds.length;

  const getPerformanceGrade = () => {
    if (avgRoundScore >= 4) return { grade: 'S', color: 'text-purple-400', desc: 'Strategic Mastery' };
    if (avgRoundScore >= 3) return { grade: 'A', color: 'text-green-400', desc: 'Excellent Strategy' };
    if (avgRoundScore >= 2) return { grade: 'B', color: 'text-blue-400', desc: 'Good Performance' };
    if (avgRoundScore >= 1.5) return { grade: 'C', color: 'text-yellow-400', desc: 'Average Performance' };
    return { grade: 'D', color: 'text-red-400', desc: 'Needs Improvement' };
  };

  const performance = getPerformanceGrade();

  // Generate AI Commentary
  const generateCommentary = () => {
    const comments = [];
    
    if (cooperationRate > 70) {
      comments.push("Your high cooperation rate built strong trust with most AI agents.");
    } else if (cooperationRate < 30) {
      comments.push("Your frequent defections triggered defensive strategies from AI agents.");
    } else {
      comments.push("You showed a balanced approach between cooperation and self-interest.");
    }

    if (avgRoundScore > 3) {
      comments.push("Your strategic decisions resulted in above-average payoffs.");
    } else if (avgRoundScore < 2) {
      comments.push("Consider the long-term implications of repeated interactions.");
    }

    // Add game mode specific commentary
    if (gameState.gameConfig?.gameMode === 'stochastic') {
      comments.push("The stochastic ending added uncertainty to your strategic planning.");
    }

    return comments.join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-600 p-4 rounded-full">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Game Complete</h1>
          <p className="text-xl text-slate-300">Final Performance Analysis</p>
          {gameState.gameConfig?.gameMode === 'stochastic' && (
            <p className="text-lg text-yellow-400 mt-2">🎲 Stochastic ending after {gameState.rounds.length} rounds</p>
          )}
        </div>

        {/* Performance Grade */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Your Strategic Grade</h2>
          <div className="flex items-center justify-center mb-6">
            <div className={`text-8xl font-bold ${performance.color} mr-8`}>
              {performance.grade}
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white mb-2">{performance.desc}</p>
              <p className="text-lg text-slate-300">Average: {avgRoundScore.toFixed(1)} points/round</p>
              <p className="text-lg text-slate-300">Cooperation: {cooperationRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">{totalScore}</p>
            <p className="text-sm text-slate-400">Total Score</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">{gameState.rounds.length}</p>
            <p className="text-sm text-slate-400">Rounds Played</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <span className="text-4xl mb-3 block">🤝</span>
            <p className="text-3xl font-bold text-green-400">
              {gameState.rounds.filter(r => r.humanChoice === 'cooperate').length}
            </p>
            <p className="text-sm text-slate-400">Cooperations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <span className="text-4xl mb-3 block">⚔️</span>
            <p className="text-3xl font-bold text-red-400">
              {gameState.rounds.filter(r => r.humanChoice === 'defect').length}
            </p>
            <p className="text-sm text-slate-400">Defections</p>
          </div>
        </div>

        {/* Round-by-Round Game History Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Table className="w-6 h-6 mr-3" />
            Round-by-Round Game History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-semibold">Round</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Your Choice</th>
                  {gameState.aiAgents.map((agent) => (
                    <th key={agent.id} className="text-left py-3 px-4 text-white font-semibold">
                      {agent.avatar} {agent.name}
                    </th>
                  ))}
                  <th className="text-left py-3 px-4 text-white font-semibold">Your Score</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Cumulative</th>
                </tr>
              </thead>
              <tbody>
                {gameState.rounds.map((round) => (
                  <tr key={round.round} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 text-white font-medium">{round.round}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${
                        round.humanChoice === 'cooperate' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {round.humanChoice === 'cooperate' ? '🤝 Cooperate' : '⚔️ Defect'}
                      </span>
                    </td>
                    {gameState.aiAgents.map((agent) => (
                      <td key={agent.id} className="py-3 px-4">
                        <span className={`font-semibold ${
                          round.aiChoices[agent.id] === 'cooperate' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {round.aiChoices[agent.id] === 'cooperate' ? '🤝' : '⚔️'}
                        </span>
                      </td>
                    ))}
                    <td className="py-3 px-4 text-white font-bold">+{round.humanPayoff}</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{round.cumulativePayoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <GameChart rounds={gameState.rounds} />
        </div>

        {/* AI Final Opinions with Strategy Reveals */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Brain className="w-6 h-6 mr-3" />
            AI Agent Final Opinions & Strategy Reveals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameState.aiAgents.map((agent) => {
              const finalTrust = agent.trustLevel;
              const wouldPlayAgain = finalTrust > 50;
              
              return (
                <div key={agent.id} className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{agent.avatar}</span>
                    <div>
                      <h4 className="font-bold text-white">{agent.name}</h4>
                      <p className="text-sm text-slate-400">{agent.personality}</p>
                    </div>
                  </div>
                  
                  {/* Strategy Reveal */}
                  <div className="bg-purple-600/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center mb-2">
                      <Eye className="w-4 h-4 mr-2 text-purple-400" />
                      <span className="text-purple-300 font-semibold">Hidden Strategy Revealed:</span>
                    </div>
                    <p className="text-white font-medium">{agent.strategy}</p>
                    <p className="text-slate-300 text-sm mt-1">
                      {agent.strategy === 'Tit-for-Tat' && 'Mirrored your previous moves after cooperating first.'}
                      {agent.strategy === 'Grim Trigger' && 'Cooperated until your first betrayal, then retaliated permanently.'}
                      {agent.strategy === 'Opportunistic' && 'Made decisions based on trust levels and potential gains.'}
                      {agent.strategy === 'Nash Equilibrium Seeker' && 'Analyzed patterns to find mutually beneficial outcomes.'}
                      {agent.strategy === 'Adaptive Mirroring' && 'Learned from recent patterns and adapted accordingly.'}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-300 mb-1">
                      <span>Final Trust:</span>
                      <span className={`font-semibold ${
                        finalTrust > 70 ? 'text-green-400' :
                        finalTrust > 40 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {finalTrust}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          finalTrust > 70 ? 'bg-green-500' :
                          finalTrust > 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${finalTrust}%` }}
                      />
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${wouldPlayAgain ? 'bg-green-600/20' : 'bg-red-600/20'}`}>
                    <p className="text-sm text-white">
                      "{wouldPlayAgain 
                        ? "You showed strategic thinking. I'd consider playing again."
                        : "Trust was broken too many times. I wouldn't play again."
                      }"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategic Analysis Commentary */}
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-6 mb-8">
          <h4 className="text-blue-300 font-semibold mb-3 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            🤖 Strategic Analysis
          </h4>
          <p className="text-slate-300 leading-relaxed">
            {generateCommentary()}
          </p>
        </div>

        {/* Game Theory Concepts Encountered */}
        <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-6 mb-8">
          <h4 className="text-purple-300 font-semibold mb-3">🧠 Game Theory Concepts Encountered</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from(new Set(gameState.rounds.map(r => r.event).filter(Boolean))).map((event) => (
              <div key={event} className="bg-slate-800/50 rounded-lg p-3">
                <span className="font-semibold text-white">{event}</span>
                <p className="text-slate-300 text-sm mt-1">
                  {event === 'Nash Equilibrium' && 'Stable mutual strategies achieved'}
                  {event === 'Grim Trigger' && 'Permanent retaliation triggered'}
                  {event === 'Mutual Defection' && 'Suboptimal outcomes for all players'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 mr-4"
          >
            Play Again
          </button>
          <div className="text-slate-400 text-sm mt-4">
            <p>"The only way to win is to keep playing." - Game Theory</p>
          </div>
        </div>
      </div>
    </div>
  );
}