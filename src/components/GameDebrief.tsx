import React from 'react';
import { Award, Brain, Users, TrendingUp, Eye, Target, Table, Lightbulb, Trophy, Crown } from 'lucide-react';
import { GameState, StrategyReveal } from '../types/game';
import { GameChart } from './GameChart';
import { STRATEGY_BEHAVIORAL_PATTERNS } from '../data/gameData';

interface GameDebriefProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onToggleGraphMode: () => void;
}

interface PlayerRanking {
  name: string;
  avatar: string;
  avgPayoff: number;
  isHuman: boolean;
  totalPayoff: number;
}

export function GameDebrief({ gameState, onPlayAgain, onToggleGraphMode }: GameDebriefProps) {
  const totalScore = gameState.rounds.reduce((sum, round) => sum + round.humanPayoff, 0);
  const cooperationRate = (gameState.rounds.filter(r => r.humanChoice === 'cooperate').length / gameState.rounds.length) * 100;
  const avgRoundScore = totalScore / gameState.rounds.length;

  // UPDATED GRADING SYSTEM - A, B, C, F based on percentage
  const getPerformanceGrade = () => {
    const maxPossibleAvgScore = 5; // Maximum possible average score per round
    const percentage = (avgRoundScore / maxPossibleAvgScore) * 100;
    
    if (percentage >= 80) return { grade: 'A', color: 'text-green-400', desc: 'Excellent Performance', percentage };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-400', desc: 'Good Performance', percentage };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400', desc: 'Average Performance', percentage };
    return { grade: 'F', color: 'text-red-400', desc: 'Needs Improvement', percentage };
  };

  const performance = getPerformanceGrade();

  // CALCULATE INDIVIDUAL PLAYER RANKINGS
  const calculatePlayerRankings = (): PlayerRanking[] => {
    const players: PlayerRanking[] = [];
    
    // Add human player
    players.push({
      name: 'You (Human)',
      avatar: '👤',
      avgPayoff: avgRoundScore,
      isHuman: true,
      totalPayoff: totalScore
    });
    
    // Add AI agents
    gameState.aiAgents.forEach(agent => {
      const totalAIPayoff = gameState.rounds.reduce((sum, round) => {
        return sum + (round.payoffs[agent.id] || 0);
      }, 0);
      const avgAIPayoff = totalAIPayoff / gameState.rounds.length;
      
      players.push({
        name: agent.name,
        avatar: agent.avatar,
        avgPayoff: avgAIPayoff,
        isHuman: false,
        totalPayoff: totalAIPayoff
      });
    });
    
    // Sort by average payoff (descending)
    return players.sort((a, b) => b.avgPayoff - a.avgPayoff);
  };

  const playerRankings = calculatePlayerRankings();
  const winner = playerRankings[0];
  const humanRank = playerRankings.findIndex(p => p.isHuman) + 1;

  // Generate strategy reveals with behavioral justifications
  const generateStrategyReveals = (): StrategyReveal[] => {
    return gameState.aiAgents.map(agent => {
      const patterns = STRATEGY_BEHAVIORAL_PATTERNS[agent.strategy as keyof typeof STRATEGY_BEHAVIORAL_PATTERNS];
      const agentRounds = gameState.rounds.map(r => r.aiChoices[agent.id]);
      const cooperations = agentRounds.filter(choice => choice === 'cooperate').length;
      const defections = agentRounds.filter(choice => choice === 'defect').length;
      
      let behavioralJustification = '';
      let keyDecisions: string[] = [];
      
      switch (agent.strategy) {
        case 'Tit-for-Tat':
          behavioralJustification = `Followed a reciprocal strategy, cooperating first then mirroring your previous moves. This strategy builds trust through predictable reciprocity.`;
          keyDecisions = [
            'Always cooperated in round 1',
            'Mirrored your previous choice in subsequent rounds',
            `Final trust level: ${agent.trustLevel}% based on your cooperation rate`
          ];
          break;
        case 'Grim Trigger':
          const firstDefection = gameState.rounds.findIndex(r => r.humanChoice === 'defect');
          if (firstDefection !== -1) {
            behavioralJustification = `Employed a harsh but clear strategy: cooperate until betrayed, then retaliate permanently. Triggered permanent defection after round ${firstDefection + 1}.`;
            keyDecisions = [
              `Cooperated for ${firstDefection + 1} rounds`,
              `Switched to permanent defection after your first betrayal`,
              'Never forgave or returned to cooperation'
            ];
          } else {
            behavioralJustification = `Maintained cooperation throughout the game as no betrayal was detected. This strategy rewards consistent cooperation.`;
            keyDecisions = [
              'Cooperated in every round',
              'Never triggered retaliation mode',
              'Maintained high trust due to your consistent cooperation'
            ];
          }
          break;
        case 'Nash Equilibrium Mimic':
          behavioralJustification = `Sought stable, mutually beneficial strategies by analyzing patterns and responding to maintain equilibrium.`;
          keyDecisions = [
            'Analyzed cooperation patterns to find stable strategies',
            'Adjusted behavior to maintain strategic balance',
            'Focused on long-term stability over short-term gains'
          ];
          break;
        case 'Subgame Perfect Equilibrium':
          behavioralJustification = `Applied strategic foresight, considering endgame implications and adjusting behavior based on remaining rounds.`;
          keyDecisions = [
            'Built reputation early in the game',
            'Considered finite game implications in decision-making',
            'Adjusted strategy based on proximity to game end'
          ];
          break;
        case 'Stochastic Strategy':
          behavioralJustification = `Used randomized decision-making with probability adjustments based on trust levels to avoid predictability.`;
          keyDecisions = [
            'Made probabilistic decisions to avoid exploitation',
            'Adjusted cooperation probability based on trust',
            'Maintained strategic unpredictability'
          ];
          break;
        case 'Trust & Reputation-Based':
          behavioralJustification = `Made decisions primarily based on accumulated trust and reputation, rewarding consistent cooperation and punishing betrayal.`;
          keyDecisions = [
            'Tracked your reputation throughout the game',
            'Adjusted cooperation based on trust levels',
            'Rewarded consistent behavior with increased cooperation'
          ];
          break;
        case 'Evolutionary Strategy':
          behavioralJustification = `Continuously adapted strategy based on performance feedback, learning from successful and unsuccessful interactions.`;
          keyDecisions = [
            'Monitored performance and adjusted accordingly',
            'Learned from both successes and failures',
            'Evolved strategy throughout the game'
          ];
          break;
        default:
          behavioralJustification = 'Employed a balanced approach to cooperation and competition.';
          keyDecisions = ['Made strategic decisions based on game context'];
      }
      
      return {
        agentId: agent.id,
        strategy: agent.strategy,
        behavioralJustification,
        keyDecisions
      };
    });
  };

  const strategyReveals = generateStrategyReveals();

  // Generate comprehensive commentary
  const generateCommentary = () => {
    const comments = [];
    
    if (cooperationRate > 70) {
      comments.push("Your high cooperation rate built strong trust with most AI agents, leading to more favorable outcomes.");
    } else if (cooperationRate < 30) {
      comments.push("Your frequent defections triggered defensive strategies from AI agents, reducing overall payoffs.");
    } else {
      comments.push("You showed a balanced approach between cooperation and self-interest, adapting to different situations.");
    }

    if (avgRoundScore > 3) {
      comments.push("Your strategic decisions resulted in above-average payoffs, demonstrating effective game theory application.");
    } else if (avgRoundScore < 2) {
      comments.push("Consider the long-term implications of repeated interactions and how reputation affects future outcomes.");
    }

    // Add strategy-specific insights
    const strategies = gameState.aiAgents.map(a => a.strategy);
    if (strategies.includes('Grim Trigger')) {
      comments.push("The presence of Grim Trigger agents made early cooperation crucial for long-term success.");
    }
    if (strategies.includes('Tit-for-Tat')) {
      comments.push("Tit-for-Tat agents rewarded consistent behavior patterns with reciprocal responses.");
    }

    if (gameState.gameConfig?.gameMode === 'stochastic') {
      comments.push("The stochastic ending added uncertainty to your strategic planning, requiring adaptive thinking.");
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
          <p className="text-xl text-slate-300">Strategic Performance Analysis & AI Strategy Reveals</p>
          {gameState.gameConfig?.gameMode === 'stochastic' && (
            <p className="text-lg text-yellow-400 mt-2">🎲 Stochastic ending after {gameState.rounds.length} rounds</p>
          )}
        </div>

        {/* WINNER ANNOUNCEMENT */}
        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h2 className="text-3xl font-bold text-white">Game Winner</h2>
            <Crown className="w-12 h-12 text-yellow-400 ml-4" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl mr-4">{winner.avatar}</span>
            <div>
              <p className="text-2xl font-bold text-yellow-400">{winner.name}</p>
              <p className="text-lg text-slate-300">Average: {winner.avgPayoff.toFixed(2)} points/round</p>
              <p className="text-lg text-slate-300">Total: {winner.totalPayoff.toFixed(2)} points</p>
            </div>
          </div>
          {winner.isHuman ? (
            <p className="text-green-400 text-lg font-semibold">🎉 Congratulations! You outperformed all AI agents!</p>
          ) : (
            <p className="text-blue-400 text-lg font-semibold">🤖 AI Victory! You ranked #{humanRank} out of {playerRankings.length} players.</p>
          )}
        </div>

        {/* PLAYER RANKINGS */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-3" />
            Final Player Rankings
          </h3>
          <div className="space-y-4">
            {playerRankings.map((player, index) => (
              <div key={player.name} className={`flex items-center justify-between p-4 rounded-lg ${
                index === 0 ? 'bg-yellow-600/20 border border-yellow-500/30' :
                player.isHuman ? 'bg-blue-600/20 border border-blue-500/30' :
                'bg-slate-800/50'
              }`}>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-orange-600 text-white' :
                    'bg-slate-600 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-3xl mr-4">{player.avatar}</span>
                  <div>
                    <p className={`font-bold ${player.isHuman ? 'text-blue-400' : 'text-white'}`}>
                      {player.name}
                    </p>
                    <p className="text-sm text-slate-400">
                      {player.isHuman ? 'Human Player' : 'AI Agent'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">{player.avgPayoff.toFixed(2)}</p>
                  <p className="text-sm text-slate-400">avg/round</p>
                  <p className="text-sm text-slate-500">({player.totalPayoff.toFixed(2)} total)</p>
                </div>
              </div>
            ))}
          </div>
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
              <p className="text-lg text-slate-300">Score: {performance.percentage.toFixed(2)}%</p>
              <p className="text-lg text-slate-300">Average: {avgRoundScore.toFixed(2)} points/round</p>
              <p className="text-lg text-slate-300">Cooperation: {cooperationRate.toFixed(2)}%</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">{totalScore.toFixed(2)}</p>
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
            Round-by-Round Game History & Strategy Table
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
                      <div className="text-xs text-slate-400 font-normal">{agent.strategy}</div>
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
                    <td className="py-3 px-4 text-white font-bold">+{round.humanPayoff.toFixed(2)}</td>
                    <td className="py-3 px-4 text-green-400 font-bold">{round.cumulativePayoff.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Performance Chart */}
        <div className="mb-8">
          <GameChart 
            rounds={gameState.rounds} 
            showPerRound={gameState.showPerRoundPayoff}
            onToggleMode={onToggleGraphMode}
          />
        </div>

        {/* AI Strategy Reveals with Behavioral Justifications */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Brain className="w-6 h-6 mr-3" />
            AI Strategy Reveals & Behavioral Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategyReveals.map((reveal) => {
              const agent = gameState.aiAgents.find(a => a.id === reveal.agentId)!;
              const finalTrust = agent.trustLevel;
              const wouldPlayAgain = finalTrust > 50;
              
              return (
                <div key={reveal.agentId} className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{agent.avatar}</span>
                    <div>
                      <h4 className="font-bold text-white">{agent.name}</h4>
                      <p className="text-sm text-slate-400">{agent.personality}</p>
                    </div>
                  </div>
                  
                  {/* Strategy Reveal */}
                  <div className="bg-purple-600/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <Eye className="w-4 h-4 mr-2 text-purple-400" />
                      <span className="text-purple-300 font-semibold">Strategy Revealed:</span>
                    </div>
                    <p className="text-white font-medium mb-2">{reveal.strategy}</p>
                    <p className="text-slate-300 text-sm">{reveal.behavioralJustification}</p>
                  </div>

                  {/* Key Decisions */}
                  <div className="bg-indigo-600/20 rounded-lg p-4 mb-4">
                    <h5 className="text-indigo-300 font-semibold mb-2">Key Strategic Decisions:</h5>
                    <ul className="text-slate-300 text-sm space-y-1">
                      {reveal.keyDecisions.map((decision, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-indigo-400 mr-2">•</span>
                          {decision}
                        </li>
                      ))}
                    </ul>
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
                        ? "Your strategic approach was respectable. I'd consider future interactions."
                        : "Trust was compromised too often. Future cooperation seems unlikely."
                      }"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comprehensive Strategic Explanations */}
        {gameState.gameConfig?.educationalMode && (
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-6 mb-8">
            <h4 className="text-purple-300 font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              🎓 Comprehensive AI Strategy Explanations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameState.aiAgents.map((agent) => {
                const agentRounds = gameState.rounds.map(r => ({
                  round: r.round,
                  choice: r.aiChoices[agent.id],
                  humanChoice: r.humanChoice,
                  trustLevel: r.round === 1 ? 70 : gameState.aiAgents.find(a => a.id === agent.id)?.trustLevel || 70
                }));
                
                let strategyExplanation = '';
                let roundByRoundAnalysis = '';
                
                switch (agent.strategy) {
                  case 'Tit-for-Tat':
                    strategyExplanation = 'This strategy starts with cooperation and then mirrors the opponent\'s previous move. It\'s forgiving but not forgetful, building trust through predictable reciprocity.';
                    roundByRoundAnalysis = agentRounds.map((round, index) => {
                      if (index === 0) return `Round ${round.round}: Started with cooperation (Tit-for-Tat always cooperates first)`;
                      const prevHumanChoice = agentRounds[index - 1].humanChoice;
                      return `Round ${round.round}: Mirrored your previous choice (${prevHumanChoice})`;
                    }).join('\n');
                    break;
                    
                  case 'Grim Trigger':
                    strategyExplanation = 'This unforgiving strategy cooperates until the first betrayal, then permanently switches to defection. It\'s a harsh but clear deterrent against betrayal.';
                    const firstDefection = agentRounds.findIndex(r => r.humanChoice === 'defect');
                    roundByRoundAnalysis = agentRounds.map((round, index) => {
                      if (firstDefection === -1) {
                        return `Round ${round.round}: Cooperated (no betrayal detected yet)`;
                      } else if (index < firstDefection) {
                        return `Round ${round.round}: Cooperated (before betrayal)`;
                      } else {
                        return `Round ${round.round}: Defected (permanent retaliation after betrayal in round ${firstDefection + 1})`;
                      }
                    }).join('\n');
                    break;
                    
                  case 'Nash Equilibrium Mimic':
                    strategyExplanation = 'This strategy seeks stable, mutually beneficial outcomes by analyzing patterns and responding to maintain equilibrium. It adapts to find the most stable strategy profile.';
                    roundByRoundAnalysis = agentRounds.map((round, index) => {
                      const cooperateRate = agentRounds.slice(0, index + 1).filter(r => r.humanChoice === 'cooperate').length / (index + 1);
                      if (cooperateRate > 0.7) return `Round ${round.round}: Cooperated (high cooperation rate: ${(cooperateRate * 100).toFixed(0)}%)`;
                      if (cooperateRate < 0.3) return `Round ${round.round}: Defected (low cooperation rate: ${(cooperateRate * 100).toFixed(0)}%)`;
                      return `Round ${round.round}: Mixed strategy (balanced cooperation rate: ${(cooperateRate * 100).toFixed(0)}%)`;
                    }).join('\n');
                    break;
                    
                  case 'Subgame Perfect Equilibrium':
                    strategyExplanation = 'This strategy considers the finite nature of the game and adjusts behavior based on remaining rounds. It builds reputation early and may defect in final rounds.';
                    roundByRoundAnalysis = agentRounds.map((round, index) => {
                      const isNearEnd = index >= agentRounds.length - 2;
                      if (index <= 2) return `Round ${round.round}: Cooperated (building reputation)`;
                      if (isNearEnd) return `Round ${round.round}: Endgame strategy (considering finite game)`;
                      return `Round ${round.round}: Responded to patterns (mid-game adaptation)`;
                    }).join('\n');
                    break;
                    
                  case 'Stochastic Strategy':
                    strategyExplanation = 'This strategy uses randomized decision-making with probability adjustments based on trust levels. It avoids predictability while maintaining some pattern awareness.';
                    roundByRoundAnalysis = agentRounds.map((round, index) => {
                      const baseProb = 0.6;
                      const trustAdjustment = (round.trustLevel - 50) / 100;
                      const finalProb = Math.max(0.1, Math.min(0.9, baseProb + trustAdjustment));
                      return `Round ${round.round}: ${round.choice} (${(finalProb * 100).toFixed(0)}% cooperation probability, trust: ${round.trustLevel}%)`;
                    }).join('\n');
                    break;
                    
                  case 'Trust & Reputation-Based':
                    strategyExplanation = 'This strategy makes decisions primarily based on accumulated trust and reputation. It rewards consistent cooperation and punishes betrayal through trust-based probability adjustments.';
                    roundByRoundAnalysis = agentRounds.map((round, index) => {
                      const trustThreshold = 60;
                      const wouldCooperate = round.trustLevel > trustThreshold;
                      return `Round ${round.round}: ${round.choice} (trust: ${round.trustLevel}%, ${wouldCooperate ? 'above' : 'below'} threshold)`;
                    }).join('\n');
                    break;
                    
                  case 'Evolutionary Strategy':
                    strategyExplanation = 'This strategy continuously adapts based on performance feedback, learning from successful and unsuccessful interactions to improve over time.';
                    roundByRoundAnalysis = agentRounds.map((round, index) => {
                      if (index === 0) return `Round ${round.round}: Initial cooperation (starting strategy)`;
                      const recentPerformance = index >= 3 ? 'analyzing recent performance' : 'learning phase';
                      return `Round ${round.round}: ${round.choice} (${recentPerformance})`;
                    }).join('\n');
                    break;
                    
                  default:
                    strategyExplanation = 'This agent employed a balanced approach to cooperation and competition.';
                    roundByRoundAnalysis = agentRounds.map(round => 
                      `Round ${round.round}: ${round.choice} (balanced strategy)`
                    ).join('\n');
                }
                
                return (
                  <div key={agent.id} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{agent.avatar}</span>
                      <div>
                        <h5 className="font-semibold text-white">{agent.name}</h5>
                        <p className="text-sm text-slate-400">{agent.strategy}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h6 className="text-purple-300 font-medium mb-1">Strategy Overview:</h6>
                      <p className="text-slate-300 text-sm">{strategyExplanation}</p>
                    </div>
                    
                    <div>
                      <h6 className="text-indigo-300 font-medium mb-1">Round-by-Round Analysis:</h6>
                      <div className="bg-slate-900/50 rounded p-3">
                        <pre className="text-slate-300 text-xs whitespace-pre-line">{roundByRoundAnalysis}</pre>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Strategic Analysis Commentary */}
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-6 mb-8">
          <h4 className="text-blue-300 font-semibold mb-3 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            🤖 Comprehensive Strategic Analysis
          </h4>
          <p className="text-slate-300 leading-relaxed">
            {generateCommentary()}
          </p>
        </div>

        {/* Game Theory Concepts Encountered */}
        {gameState.conceptsEncountered && gameState.conceptsEncountered.length > 0 && (
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-6 mb-8">
            <h4 className="text-purple-300 font-semibold mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              🧠 Game Theory Concepts Encountered
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameState.conceptsEncountered.map((concept) => (
                <div key={concept} className="bg-slate-800/50 rounded-lg p-3">
                  <span className="font-semibold text-white">{concept}</span>
                  <p className="text-slate-300 text-sm mt-1">
                    {concept === 'Nash Equilibrium' && 'Stable mutual strategies achieved'}
                    {concept === 'Grim Trigger' && 'Permanent retaliation triggered'}
                    {concept === 'Mutual Defection' && 'Suboptimal outcomes for all players'}
                    {concept === 'Trust Building' && 'Reputation effects observed'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educational Reflection Prompts */}
        {gameState.gameConfig?.educationalMode && (
          <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6 mb-8">
            <h4 className="text-green-300 font-semibold mb-3">🎓 Reflection Questions</h4>
            <div className="space-y-3">
              <p className="text-slate-300">• How did knowing the game would end affect your strategic decisions?</p>
              <p className="text-slate-300">• Which AI strategies were most effective against your approach?</p>
              <p className="text-slate-300">• How would you adjust your strategy if you played again?</p>
              <p className="text-slate-300">• What role did reputation and trust play in the outcomes?</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 mr-4"
          >
            Play Again with New Strategies
          </button>
          <div className="text-slate-400 text-sm mt-4">
            <p>"The only way to win is to keep playing and learning." - Game Theory</p>
          </div>
        </div>
      </div>
    </div>
  );
}