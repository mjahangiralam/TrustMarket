import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { GameRound } from '../types/game';

interface GameChartProps {
  rounds: GameRound[];
}

export function GameChart({ rounds }: GameChartProps) {
  if (rounds.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="text-center text-slate-400">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Performance chart will appear after the first round</p>
        </div>
      </div>
    );
  }

  const maxScore = Math.max(...rounds.map(r => r.cumulativePayoff));
  const minScore = Math.min(...rounds.map(r => r.cumulativePayoff));
  const range = maxScore - minScore || 1;
  const chartWidth = 600;
  const chartHeight = 300;
  const padding = 40;

  // Calculate points for the line
  const points = rounds.map((round, index) => {
    const x = padding + (index / (rounds.length - 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - ((round.cumulativePayoff - minScore) / range) * (chartHeight - 2 * padding);
    return { x, y, round };
  });

  // Create path string for the line
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <TrendingUp className="w-6 h-6 mr-3" />
          Strategic Performance Over Time
        </h3>
        <div className="text-right">
          <p className="text-slate-300 text-sm">Current Score</p>
          <p className="text-2xl font-bold text-green-400">
            {rounds[rounds.length - 1]?.cumulativePayoff || 0}
          </p>
        </div>
      </div>

      <div className="relative bg-slate-800 rounded-lg p-4">
        {/* SVG Line Chart */}
        <svg width={chartWidth} height={chartHeight} className="w-full h-64">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Y-axis labels */}
          <text x="10" y="50" fill="#9CA3AF" fontSize="12">{maxScore}</text>
          <text x="10" y={chartHeight/2} fill="#9CA3AF" fontSize="12">{Math.round((maxScore + minScore) / 2)}</text>
          <text x="10" y={chartHeight - 20} fill="#9CA3AF" fontSize="12">{minScore}</text>
          
          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {points.map((point, index) => {
            const round = rounds[index];
            const isCooperate = round.humanChoice === 'cooperate';
            
            return (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill={isCooperate ? '#10B981' : '#EF4444'}
                  stroke="#1F2937"
                  strokeWidth="2"
                  className="hover:r-8 transition-all cursor-pointer"
                />
                
                {/* Round labels */}
                <text
                  x={point.x}
                  y={chartHeight - 10}
                  fill="#9CA3AF"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {round.round}
                </text>
                
                {/* Tooltip on hover */}
                <title>
                  Round {round.round}: {round.cumulativePayoff} points
                  Choice: {round.humanChoice}
                  Round Gain: +{round.humanPayoff}
                </title>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-6 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-slate-300">Cooperate</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-slate-300">Defect</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {rounds.filter(r => r.humanChoice === 'cooperate').length}
          </p>
          <p className="text-sm text-slate-400">Cooperations</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {rounds.filter(r => r.humanChoice === 'defect').length}
          </p>
          <p className="text-sm text-slate-400">Defections</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {rounds.length > 0 ? Math.round((rounds[rounds.length - 1].cumulativePayoff / rounds.length) * 10) / 10 : 0}
          </p>
          <p className="text-sm text-slate-400">Avg/Round</p>
        </div>
      </div>
    </div>
  );
}